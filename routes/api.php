<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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


Route::get('/tickers', function (Request $request) {
    return response()->json(
        Ticker::select(['id', 'tikr', 'name', 'exchange_id'])->where('exchange_id', 2)->orderBy('tikr')->get()
    );
});


Route::get('/security/{exchange}/{tikr}/summary', function (Request $request) {
    $ticker = '{
  "symbol" : "AAPL",
  "date" : "2021-09-25",
  "period" : "FY",
  "currentRatio" : 1.0745531195957954,
  "quickRatio" : 0.9096596297447422,
  "cashRatio" : 0.2784485300563432,
  "daysOfSalesOutstanding" : 51.390968708397914,
  "daysOfInventoryOutstanding" : 11.27659274770989,
  "operatingCycle" : 62.667561456107805,
  "daysOfPayablesOutstanding" : 93.85107122231561,
  "cashConversionCycle" : -31.183509766207806,
  "grossProfitMargin" : 0.4177935962516778,
  "operatingProfitMargin" : 0.29782377527561593,
  "pretaxProfitMargin" : 0.2985290459437369,
  "netProfitMargin" : 0.2588179335569424,
  "effectiveTaxRate" : 0.13302260844085087,
  "returnOnAssets" : 0.26974205275183616,
  "returnOnEquity" : 1.5007132667617689,
  "returnOnCapitalEmployed" : 0.48309913489209433,
  "netIncomePerEBT" : 0.8669773915591491,
  "ebtPerEbit" : 1.0023680804780217,
  "ebitPerRevenue" : 0.29782377527561593,
  "debtRatio" : 0.8202574344305731,
  "debtEquityRatio" : 4.563512442542399,
  "longTermDebtToCapitalization" : 0.6336151826987851,
  "totalDebtToCapitalization" : 0.6640736066961648,
  "interestCoverage" : 41.19054820415879,
  "cashFlowToDebtRatio" : 0.8341792349201004,
  "companyEquityMultiplier" : 5.563512442542399,
  "receivablesTurnover" : 7.102415252591931,
  "payablesTurnover" : 3.889140478060004,
  "inventoryTurnover" : 32.367933130699086,
  "fixedAssetTurnover" : 9.275278904665315,
  "assetTurnover" : 1.042207736708053,
  "operatingCashFlowPerShare" : 6.229345884552985,
  "freeCashFlowPerShare" : 5.56562398361035,
  "cashPerShare" : 3.750552652516527,
  "payoutRatio" : 0.15279890156316012,
  "operatingCashFlowSalesRatio" : 0.284399030116151,
  "freeCashFlowOperatingCashFlowRatio" : 0.8934523923950864,
  "cashFlowCoverageRatios" : 0.8341792349201004,
  "shortTermCoverageRatios" : 6.663549606097483,
  "capitalExpenditureCoverageRatio" : -9.385475868290483,
  "dividendPaidAndCapexCoverageRatio" : 30.76227084565346,
  "dividendPayoutRatio" : 0.15279890156316012,
  "priceBookValueRatio" : 39.348186084311884,
  "priceToBookRatio" : 39.348186084311884,
  "priceToSalesRatio" : 6.786117266445345,
  "priceEarningsRatio" : 26.219656316637483,
  "priceToFreeCashFlowsRatio" : 26.706798705359017,
  "priceToOperatingCashFlowsRatio" : 23.86125319651701,
  "priceCashFlowRatio" : 23.86125319651701,
  "priceEarningsToGrowthRatio" : 0.3677417898647037,
  "priceSalesRatio" : 6.786117266445345,
  "dividendYield" : 0.00582764700337444,
  "enterpriseValueMultiple" : 20.889553502300195,
  "priceFairValue" : 39.348186084311884
}';
    return response()->json(json_decode($ticker));
});
