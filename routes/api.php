<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\Ticker;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
const FMP_RATIOS_FY = 'https://financialmodelingprep.com/api/v3/ratios/%s?limit=%s&apikey=%s';
const FMP_RATIOS_TTM = 'https://financialmodelingprep.com/api/v3/ratios-ttm/%s?limit=%s&apikey=%s';
const FMP_RATIOS_QTR = 'https://financialmodelingprep.com/api/v3/ratios/%s?limit=%s&apikey=%s&period=quarter';

Route::get('/tickers', function (Request $request) {
    return response()->json(
        Ticker::select(['id', 'tikr', 'name', 'exchange_id'])->where('exchange_id', 2)->orderBy('tikr')->get()
    );
});


Route::get('/security/{exchange}/{security}/relative-valuation/{period}', function (Request $request) {
    $periodsUrl = [
        'fy' => FMP_RATIOS_FY,
        'ttm' => FMP_RATIOS_TTM,
        'qtr' => FMP_RATIOS_QTR,
    ];

    $period = strtolower($request->period);

    $key = join(
        '_',
        [
            'security',
            'ratios',
            // TODO: check valid period.
            strtolower($request->period),
            strtolower($request->security)
        ]
    );

    $cachedSecurity = Redis::get($key);

    if (isset($cachedSecurity)) {
        return response()->json(json_decode($cachedSecurity), 200);
    }

    $endpoint = sprintf(
        $periodsUrl[$period], 
        strtoupper($request->security), 1, env('FMP_API_KEY')
    );

    $response = Http::acceptJson()->get($endpoint);

    if ($response->ok()) {
        $data = $response->json();
        if (count($data)) {
            Redis::set($key, json_encode($data[0]));
            return response()->json($data[0]);
        }
    }

    $response->throw()->json();
    // return response()->json(['status' => 'error'], 418);
});
