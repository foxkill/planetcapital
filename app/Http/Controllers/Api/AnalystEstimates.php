<?php

namespace App\Http\Controllers\Api;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use RuntimeException;

class AnalystEstimates extends Controller
{
    /**
     * The FMP api url to retrieve analysts future estimates.
     * 
     * @string
     */
    const FMP_ANALYST_ESTIMATES = 'https://financialmodelingprep.com/api/v3/analyst-estimates/%s?apikey=%s&limit=%s';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $key = $this->getCacheKey($request);

        $analystEstimates = Cache::get($key);

        if (isset($analystEstimates)) {
            return response()->json(json_decode($analystEstimates), Response::HTTP_OK);
        }

        $isTTMRequest = false;
        $limit = (int) ($request->limit ?? 1);
        $period = strtolower(trim($request->period));

        if ($period == "ttm") {
            $isTTMRequest = true;
            $limit *= 4;
        }

        $endpoint = sprintf(
            self::FMP_ANALYST_ESTIMATES,
            strtoupper($request->security),
            env('FMP_API_KEY'),
            $limit
        );

        // We must append the correct period if it is given.
        if (!empty($period)) {
            if ($period != "fy") {
                // TTM or QTR.
                $period = "quarter";
            }

            $endpoint .= "&period=" . $period;
        }

        $response = Http::acceptJson()->get($endpoint);

        if (!$response->ok()) {
            $response->throw()->json();
        }

        $data = $response->json();
        if (count($data)) {
            if ($isTTMRequest) {
                $ttmData = $this->ttm($data, count($data));
                Cache::put($key, json_encode($ttmData));
                return response()->json($ttmData, Response::HTTP_CREATED);
            }

            Cache::put($key, json_encode($data));

            return response()->json($data, Response::HTTP_CREATED);
        }

        throw new RuntimeException("No data available.");
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
     * Return the key use to access the cached entry.
     * 
     * @param Request $request The request.
     * 
     * @return string
     */
    private function getCacheKey(Request $request)
    {
        return join(
            '_',
            [
                'security',
                'analyst-estimates',
                strtolower($request->period),
                strtolower($request->security),
                $request->limit ?? 1
            ]
        );
    }

    /**
     * Return an empty analyst estimation.
     * 
     * @return array
     */
    private function createEmptyEstimate()
    {
        $ae = [
            'symbol' => '',
            'date' => '',
            'estimatedRevenueLow' => 0,
            'estimatedRevenueHigh' => 0,
            'estimatedRevenueAvg' => 0,
            'estimatedEbitdaLow' => 0,
            'estimatedEbitdaHigh' => 0,
            'estimatedEbitdaAvg' => 0,
            'estimatedEbitLow' => 0,
            'estimatedEbitHigh' => 0,
            'estimatedEbitAvg' => 0,
            'estimatedNetIncomeLow' => 0,
            'estimatedNetIncomeHigh' => 0,
            'estimatedNetIncomeAvg' => 0,
            'estimatedSgaExpenseLow' => 0,
            'estimatedSgaExpenseHigh' => 0,
            'estimatedSgaExpenseAvg' => 0,
            'estimatedEpsLow' => 0,
            'estimatedEpsHigh' => 0,
            'estimatedEpsAvg' => 0,
            'numberAnalystEstimatedRevenue' => 0,
            'numberAnalystsEstimatedEps' => 0,
        ];

        return $ae;
    }

    /**
     * Calculate the TTM value.
     */
    private function ttm($data, $limit)
    {
        if (count($data) < 4) {
            throw new RuntimeException("Invalid data structure given.");
        }

        $sum = [];
        $ttm_list = [];

        // First pass.
        $current = $this->createEmptyEstimate();
        $current['symbol'] = $data[0]['symbol'];
        $current['date'] = $data[0]['date'];
        $current['numberAnalystEstimatedRevenue'] = $data[0]['numberAnalystEstimatedRevenue'];
        $current['numberAnalystsEstimatedEps'] = $data[0]['numberAnalystsEstimatedEps'];

        // Calculate the base sums.
        for ($i = 0; $i < 4; $i++) {
            $current['estimatedRevenueLow'] += $data[$i]['estimatedRevenueLow'];
            $current['estimatedRevenueHigh'] += $data[$i]['estimatedRevenueHigh'];
            $current['estimatedRevenueAvg'] += $data[$i]['estimatedRevenueAvg'];

            $current['estimatedEbitdaLow'] += $data[$i]['estimatedEbitdaLow'];
            $current['estimatedEbitdaHigh'] += $data[$i]['estimatedEbitdaHigh'];
            $current['estimatedEbitdaAvg'] += $data[$i]['estimatedEbitdaAvg'];

            $current['estimatedEbitLow'] += $data[$i]['estimatedEbitLow'];
            $current['estimatedEbitHigh'] += $data[$i]['estimatedEbitHigh'];
            $current['estimatedEbitAvg'] += $data[$i]['estimatedEbitAvg'];

            $current['estimatedNetIncomeLow'] += $data[$i]['estimatedNetIncomeLow'];
            $current['estimatedNetIncomeHigh'] += $data[$i]['estimatedNetIncomeHigh'];
            $current['estimatedNetIncomeAvg'] += $data[$i]['estimatedNetIncomeAvg'];

            $current['estimatedSgaExpenseLow'] += $data[$i]['estimatedSgaExpenseLow'];
            $current['estimatedSgaExpenseHigh'] += $data[$i]['estimatedSgaExpenseHigh'];
            $current['estimatedSgaExpenseAvg'] += $data[$i]['estimatedSgaExpenseAvg'];

            $current['estimatedEpsLow'] += $data[$i]['estimatedEpsLow'];
            $current['estimatedEpsHigh'] += $data[$i]['estimatedEpsHigh'];
            $current['estimatedEpsAvg'] += $data[$i]['estimatedEpsAvg'];
        }

        $ttm_list[] = $current;

        // TODO: consider implementing second pass.
        return $ttm_list;
    }
}
