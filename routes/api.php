<?php

use App\Http\Controllers\Api\IncomeStatements;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;
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
const FMP_PROFILE = 'https://financialmodelingprep.com/api/v3/profile/%s?apikey=%s';
const FMP_INCOME_STATEMENT = 'https://financialmodelingprep.com/api/v3/income-statement/%s?apikey=%s&limit=%s';

Route::get('/tickers', function (Request $request) {
    return response()->json(
        Ticker::select(['id', 'tikr', 'name', 'exchange_id'])->where('exchange_id', 2)->orderBy('tikr')->get()
    );
});

//
// Relative Valuation
//
Route::get('/security/{exchange}/{security}/relative-valuation/{period}/limit/{limit}', function (Request $request) {
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
            strtolower($request->security),
            $request->limit ?? 1,
        ]
    );

    $cachedSecurity = Redis::get($key);

    // Use cached entry if available.
    if (isset($cachedSecurity)) {
        $data = json_decode($cachedSecurity);
        if (count($data) == 1) {
            $data = $data[0];
        }
        return response()->json($data, Response::HTTP_OK);
    }

    // Build the endpoint.
    $endpoint = sprintf(
        $periodsUrl[$period],
        strtoupper($request->security),
        $request->limit ?? 1,
        env('FMP_API_KEY')
    );


    $response = Http::acceptJson()->get($endpoint);

    if ($response->ok()) {
        $data = $response->json();
        $count = count($data);

        if ($count) {
            Redis::set($key, json_encode($data));

            if (count($data) == 1) {
                $data = $data[0];
            }

            return response()->json($data, Response::HTTP_CREATED);
        }
    }

    $response->throw()->json();
});

//
// Profile
// 
Route::get('/security/{exchange}/{security}/profile', function (Request $request) {
    $key = join( '_', [ 'security', 'profile', strtolower($request->security)]);

    $cachedSecurity = Redis::get($key);

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
// Image
//
Route::get('/security/{exchange}/{security}/image', function (Request $request) {
   $key = join('_', ['security', 'profile', strtolower($request->security)]);

    $imageUrl = '';
    $cachedSecurity = Cache::get($key);

    // We have a stored Profile.
    if (isset($cachedSecurity)) {
        $data = json_decode($cachedSecurity);
        $imageUrl = $data["image"];

        $key = join('_', ['security', 'image', strtolower($request->security)]);

        $imageData = Cache::get($key);
        if ($imageData) {
            // data:image/png;base64,imagedatabase64
            list($baseHeader, $image) = explode(",", $imageData);
            list($imageHeader) = explode(";", $baseHeader);
            $contentType = str_replace("data:", "", $imageHeader);
            return response(base64_decode($image), 200, ['Content-Type', 'image/png']);
        }

        // Get the image
        $response = Http::get($imageUrl);
        if ($response->ok()) {
            Cache::put($key, base64_encode($response->body()));
            response($response->body(), 200)->header('Content-Type', 'image/png');
        }
    }

    // We have no profile yet. Get it.
    $endpoint = sprintf(FMP_PROFILE, $request->security, env('FMP_API_KEY'));
    $response = Http::get($endpoint);

    if (!$response->ok()) {
        $response->throw()->json();
        return;
    }

    $profile = $response->json();
    if (!$profile) {
        // TODO: throw an error.
    }

    $imageUrl = $profile[0]["image"];

    $response = Http::get($imageUrl);
    if (!$response->ok()) {
        // TODO: throw an error.
    }

    // Cache::put($key, base64_encode($response->body()));


    return response($response->body(), 200)->header('Content-Type', 'image/png');
});