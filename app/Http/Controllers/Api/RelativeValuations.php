<?php

namespace App\Http\Controllers\Api;

use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Foxkill\Fmptools\Ratio;
use RuntimeException;

class RelativeValuations extends Controller
{
    const FMP_RATIOS_FY = 'https://financialmodelingprep.com/api/v3/ratios/%s?limit=%s&apikey=%s';
    const FMP_RATIOS_TTM = 'https://financialmodelingprep.com/api/v3/ratios-ttm/%s?limit=%s&apikey=%s';
    const FMP_RATIOS_QTR = 'https://financialmodelingprep.com/api/v3/ratios/%s?limit=%s&apikey=%s&period=quarter';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $periodsUrl = [
            'fy' => self::FMP_RATIOS_FY,
            'ttm' => self::FMP_RATIOS_TTM,
            'qtr' => self::FMP_RATIOS_QTR,
        ];

        $period = strtolower($request->period);
        $isTTM = $period === "ttm" && $request->limit > 1;
        $limit = intval($request->limit) ?? 1;

        $key = join(
            '_',
            [
                'security',
                'ratios',
                // TODO: check valid period.
                $period,
                strtolower($request->security),
                $limit,
            ]
        );

        $cachedSecurity = Cache::get($key);

        // Use cached entry if available.
        if (isset($cachedSecurity)) {
            $data = json_decode($cachedSecurity);
            return response()->json($data, Response::HTTP_OK);
        }

        // Build the endpoint.
        $endpoint = sprintf(
            $periodsUrl[$isTTM ? 'qtr' : $period],
            strtoupper($request->security),
            $limit,
            env('FMP_API_KEY')
        );

        $response = Http::acceptJson()->get($endpoint);

        if (!$response->ok()) {
            $response->throw()->json();
        }

        $data = $response->json();

        if (0 == count($data)) {
            throw new \RuntimeException("No data available from this endpoint");
        }

        if ($isTTM) {
            $data = $this->ttm($data, min(count($data), $limit));
        }

        Cache::put($key, json_encode($data));

        return response()->json($data, Response::HTTP_CREATED);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Create an empty ratio structure.
     * 
     * @return array
     */
    private function createEmptyRatio()
    {
        return Ratio::create();
        // return [
        //     "symbol" => "",
        //     "date" => "",
        //     "period" => "TTM",
        //     "currentRatio" => 0,
        //     "quickRatio" => 0,
        //     "cashRatio" => 0,
        //     "daysOfSalesOutstanding" => 0,
        //     "daysOfInventoryOutstanding" => 0,
        //     "operatingCycle" => 0,
        //     "daysOfPayablesOutstanding" => 0,
        //     "cashConversionCycle" => 0,
        //     "grossProfitMargin" => 0,
        //     "operatingProfitMargin" => 0,
        //     "pretaxProfitMargin" => 0,
        //     "netProfitMargin" => 0,
        //     "effectiveTaxRate" => 0,
        //     "returnOnAssets" => 0,
        //     "returnOnEquity" => 0,
        //     "returnOnCapitalEmployed" => 0,
        //     "netIncomePerEBT" => 0,
        //     "ebtPerEbit" => 0,
        //     "ebitPerRevenue" => 0,
        //     "debtRatio" => 0,
        //     "debtEquityRatio" => 0,
        //     "longTermDebtToCapitalization" => 0,
        //     "totalDebtToCapitalization" => 0,
        //     "interestCoverage" => 0,
        //     "cashFlowToDebtRatio" => 0,
        //     "companyEquityMultiplier" => 0,
        //     "receivablesTurnover" => 0,
        //     "payablesTurnover" => 0,
        //     "inventoryTurnover" => 0,
        //     "fixedAssetTurnover" => 0,
        //     "assetTurnover" => 0,
        //     "operatingCashFlowPerShare" => 0,
        //     "freeCashFlowPerShare" => 0,
        //     "cashPerShare" => 0,
        //     "payoutRatio" => 0,
        //     "operatingCashFlowSalesRatio" => 0,
        //     "freeCashFlowOperatingCashFlowRatio" => 0,
        //     "cashFlowCoverageRatios" => 0,
        //     "shortTermCoverageRatios" => 0,
        //     "capitalExpenditureCoverageRatio" => 0,
        //     "dividendPaidAndCapexCoverageRatio" => 0,
        //     "dividendPayoutRatio" => 0,
        //     "priceBookValueRatio" => 0,
        //     "priceToBookRatio" => 0,
        //     "priceToSalesRatio" => 0,
        //     "priceEarningsRatio" => 0,
        //     "priceToFreeCashFlowsRatio" => 0,
        //     "priceToOperatingCashFlowsRatio" => 0,
        //     "priceCashFlowRatio" => 0,
        //     "priceEarningsToGrowthRatio" => 0,
        //     "priceSalesRatio" => 0,
        //     "dividendYield" => 0,
        //     "enterpriseValueMultiple" => 0,
        //     "priceFairValue" => 0
        // ];
    }

    /*
     * Calculate TTM values.
     */
    private function ttm($data)
    {
        if (count($data) < 4) {
            throw new RuntimeException("Invalid data structure given.");
        }

        $sum = [];
        $ttm_list = [];
        
        // First pass.
        $current = $this->createEmptyRatio();
        $current['symbol'] = $data[0]['symbol'];
        $current['date'] = $data[0]['date'];

        // Calculate the base sums.
        for ($i = 0; $i < 4; $i++) { 
            $current['grossProfitMargin'] += $data[$i]['grossProfitMargin'];
            $current['operatingProfitMargin'] += $data[$i]['operatingProfitMargin'];
            $current['netProfitMargin'] += $data[$i]['netProfitMargin'];
            $current['returnOnEquity'] += $data[$i]['returnOnEquity'];
            $current['returnOnAssets'] += $data[$i]['returnOnAssets'];
            $current['returnOnCapitalEmployed'] += $data[$i]['returnOnCapitalEmployed'];
        }

        $qtrValues = [
            'grossProfitMargin',
            'operatingProfitMargin',
            'netProfitMargin',
        ];

        foreach ($qtrValues as $key => $value) {
            $sum[$value] = $current[$value];
            $current[$value] /= 4;
        }

        $sum['returnOnEquity'] = $current['returnOnEquity'];
        $sum['returnOnAssets'] = $current['returnOnAssets'];
        $sum['returnOnCapitalEmployed'] = $current['returnOnCapitalEmployed'];

        $ttm_list[] = $current;

        $current = $this->createEmptyRatio();

        for ($i = 3, $n = count($data) - 4; $i < $n; $i++) {
            $current['symbol'] = $data[$i - 2]['symbol'];
            $current['date'] = $data[$i - 2]['date'];

            $sum['grossProfitMargin'] -= $data[$i - 3]['grossProfitMargin'];
            $sum['grossProfitMargin'] += $data[$i + 1]['grossProfitMargin'];

            $sum['operatingProfitMargin'] -= $data[$i - 3]['operatingProfitMargin'];
            $sum['operatingProfitMargin'] += $data[$i + 1]['operatingProfitMargin'];

            $sum['netProfitMargin'] -= $data[$i - 3]['netProfitMargin'];
            $sum['netProfitMargin'] += $data[$i + 1]['netProfitMargin'];
            
            $sum['returnOnEquity'] -= $data[$i - 3]['returnOnEquity'];
            $sum['returnOnEquity'] += $data[$i + 1]['returnOnEquity'];

            $sum['returnOnAssets'] -= $data[$i - 3]['returnOnAssets'];
            $sum['returnOnAssets'] += $data[$i + 1]['returnOnAssets'];

            $sum['returnOnCapitalEmployed'] -= $data[$i - 3]['returnOnCapitalEmployed'];
            $sum['returnOnCapitalEmployed'] += $data[$i + 1]['returnOnCapitalEmployed'];

            $current['grossProfitMargin'] = $sum['grossProfitMargin'] / 4;
            $current['operatingProfitMargin'] = $sum['operatingProfitMargin'] / 4;
            $current['netProfitMargin'] = $sum['netProfitMargin'] / 4;

            $current['returnOnEquity'] = $sum['returnOnEquity'];
            $current['returnOnAssets'] = $sum['returnOnAssets'];
            $current['returnOnCapitalEmployed'] = $sum['returnOnCapitalEmployed'];

            $ttm_list[] = $current;

            $current = $this->createEmptyRatio();
        }

        return array_slice($ttm_list, 0, -4);
    }
}
