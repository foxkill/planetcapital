<?php

use App\Http\Controllers\Api\CashflowStatements;
use App\Http\Controllers\Api\IncomeStatements;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Api\CompanyImage;
use App\Http\Controllers\Api\RelativeValuations;
use App\Http\Controllers\RatiosController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cache;
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
const FMP_PROFILE = 'https://financialmodelingprep.com/api/v3/profile/%s?apikey=%s';
const FMP_INCOME_STATEMENT = 'https://financialmodelingprep.com/api/v3/income-statement/%s?apikey=%s&limit=%s';
const FMP_KEY_METRICS = 'https://financialmodelingprep.com/api/v3/key-metrics%s/%s?apikey=%s&limit=%s';
const FMP_BALANCE_SHEET = 'https://financialmodelingprep.com/api/v3/balance-sheet-statement/%s?apikey=%s&limit=%s';

Route::get('/tickers', function (Request $request) {
    return response()->json(
        Ticker::select(['id', 'tikr', 'name', 'exchange_id'])->where('exchange_id', 2)->orderBy('tikr')->get()
    );
});

//
// Relative Valuation
//
Route::get('/security/{exchange}/{security}/relative-valuation/{period}/limit/{limit}', [RelativeValuations::class, 'index']);

//
// Profile
// 
Route::get('/security/{exchange}/{security}/profile', function (Request $request) {
    $key = join('_', ['security', 'profile', strtolower($request->security)]);

    $cachedSecurity = Cache::get($key);

    if (isset($cachedSecurity)) {
        return response()->json(json_decode($cachedSecurity), Response::HTTP_OK);
    }

    $endpoint = sprintf(
        FMP_PROFILE,
        $request->security,
        env('FMP_API_KEY')
    );

    $response = Http::acceptJson()->get($endpoint);

    if ($response->ok()) {
        $data = $response->json();
        if (count($data)) {
            Redis::set($key, json_encode($data[0]));
            return response()->json($data[0], Response::HTTP_CREATED);
        }
    }

    $response->throw()->json();
});

//
// Income Statement
// 
Route::get('/security/{exchange}/{security}/income-statement/period/{period}/limit/{limit}', [IncomeStatements::class, 'index']);

//
// Cash Flow Statement
// 
Route::get('/security/{exchange}/{security}/cash-flow-statement/period/{period}/limit/{limit}', [CashflowStatements::class, 'index']);

//
// Profitability
// 
Route::get('/security/{exchange}/{security}/profitability/period/{period}/limit/{limit}', function (Request $request) {
    $key = join(
        '_',
        [
            'security',
            'key-metrics',
            strtolower($request->exchange),
            strtolower($request->security),
            strtolower($request->period),
            $request->limit ?? 1
        ]
    );

    $cachedKeyMetrics = Cache::get($key);

    if (isset($cachedKeyMetrics)) {
        return response()->json(json_decode($cachedKeyMetrics), Response::HTTP_OK);
    }

    $endpoint = sprintf(
        FMP_KEY_METRICS,
        $request->period === 'ttm' ? '-ttm' : '',
        strtoupper($request->security),
        env('FMP_API_KEY'),
        $request->limit ?? 1
    );

    if (strtolower($request->period) === "qtr") {
        $endpoint .= "&period=quarter";
    }

    $response = Http::acceptJson()->get($endpoint);

    if (!$response->ok()) {
        return $response->throw()->json();
    }

    $data = $response->json();
    if (count($data) === 0) {
        return response()->json(['error' => 'Resource not found'], Response::HTTP_NOT_FOUND);
    }

    Cache::put($key, json_encode($data));

    return response()->json($data, Response::HTTP_CREATED);
});


//
// Balance sheet (for heatmap)
//
Route::get('/security/{exchange}/{security}/balance-sheet/period/{period}/limit/{limit}', function (Request $request) {
    $key = join(
        '_',
        [
            'security',
            'balance-sheet',
            strtolower($request->exchange),
            strtolower($request->security),
            strtolower($request->period),
            $request->limit ?? 1
        ]
    );

    $cachedBalanceSheet = Cache::get($key);

    if (isset($cachedBalanceSheet)) {
        return response()->json(json_decode($cachedBalanceSheet), Response::HTTP_OK);
    }

    $endpoint = sprintf(
        FMP_BALANCE_SHEET,
        strtoupper($request->security),
        env('FMP_API_KEY'),
        $request->limit ?? 1
    );

    if (strtolower($request->period) === "qtr") {
        $endpoint .= "&period=quarter";
    }

    $response = Http::acceptJson()->get($endpoint);

    if (!$response->ok()) {
        return $response->throw()->json();
    }

    $data = $response->json();

    if (count($data) === 0) {
        return response()->json(['error' => 'Resource not found'], Response::HTTP_NOT_FOUND);
    }

    Cache::put($key, json_encode($data));

    return response()->json($data, Response::HTTP_CREATED);
});

//
// Image
//
Route::get('/security/{exchange}/{security}/image', [CompanyImage::class, 'index']);
