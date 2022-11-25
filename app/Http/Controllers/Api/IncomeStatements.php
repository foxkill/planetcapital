<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class IncomeStatements extends Controller
{

    const FMP_INCOME_STATEMENT = 'https://financialmodelingprep.com/api/v3/income-statement/%s?apikey=%s&limit=%s';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cachedIncomeStatement = Cache::get($key = $this->getCacheKey($request));

        if (isset($cachedIncomeStatement)) {
            return response()->json(json_decode($cachedIncomeStatement), Response::HTTP_OK);
        }

        $isTTMRequest = false;
        $limit = (int) ($request->limit ?? 1);
        $period = $request->period;

        if (strtolower($period) == "ttm") {
            $isTTMRequest = true;
            $limit *= 4;
        }

        $endpoint = sprintf(
            self::FMP_INCOME_STATEMENT,
            strtoupper($request->security),
            env('FMP_API_KEY'),
            $limit
        );

        if (strlen($period)) {
            $period = strtolower($period);
            if ($period != "fy") {
                $period = "quarter";
            }

            $endpoint .= "&period=" . $period;
        }

        $response = Http::acceptJson()->get($endpoint);

        if ($response->ok()) {
            $data = $response->json();
            if (count($data)) {
                if ($isTTMRequest) {
                    $ttm = []; 
                    $current = [];
                    for ($i = 0, $year = (int) $data[0]["calendarYear"]; $i < $limit; $i++) { 
                        // $currentYear = (int) $data[$i]["calendarYear"];
                        if ($i % 4 == 0) {
                            if (count($current)) {
                                $ttm[] = $current;
                            }
                            $current = $this->createIncomeStatementTTM();
                        }

                        $current["period"] = "TTM";
                        $current["revenue"] += $data[$i]["revenue"];
                        $current["costOfRevenue"] += $data[$i]["costOfRevenue"];
                    }
                }
                Cache::put($key, json_encode($data));
                return response()->json($data, Response::HTTP_CREATED);
            }
        }

        $response->throw()->json();
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
     * Get the cache key.
     */
    private function getCacheKey(Request $request) 
    {
        return join(
            '_',
            [
                'security',
                'income_statement',
                strtolower($request->period),
                strtolower($request->security),
                $request->limit ?? 1
            ]
        );
    }

    private function createIncomeStatementTTM()
    {
        $ic = [
            'date' => '',
            'symbol' => '',
            'reportedCurrency' => '',
            'cik' => '',
            'fillingDate' => '',
            'acceptedDate' => '',
            'calendarYear' => '',
            'period' => '',
            'revenue' => 0,
            'costOfRevenue' => 0,
            'grossProfit' => 0,
            'grossProfitRatio' => 0,
            'researchAndDevelopmentExpenses' => 0,
            'generalAndAdministrativeExpenses' => 0,
            'sellingAndMarketingExpenses' => 0,
            'sellingGeneralAndAdministrativeExpenses' => 0,
            'otherExpenses' => 0,
            'operatingExpenses' => 0,
            'costAndExpenses' => 0,
            'interestIncome' => 0,
            'interestExpense' => 0,
            'depreciationAndAmortization' => 0,
            'ebitda' => 0,
            'ebitdaratio' => 0,
            'operatingIncome' => 0,
            'operatingIncomeRatio' => 0,
            'totalOtherIncomeExpensesNet' => 0,
            'incomeBeforeTax' => 0,
            'incomeBeforeTaxRatio' => 0,
            'incomeTaxExpense' => 0,
            'netIncome' => 0,
            'netIncomeRatio' => 0,
            'eps' => 0,
            'epsdiluted' => 0,
            'weightedAverageShsOut' => 0,
            'weightedAverageShsOutDil' => 0,
            'link' => '',
            'finalLink' => '',
        ];

        return $ic;
    }
}
