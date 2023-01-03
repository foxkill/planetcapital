<?php

namespace App\Http\Controllers\Api;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CashflowStatements extends Controller
{
    const FMP_CASHFLOW_STATEMENT = 'https://financialmodelingprep.com/api/v3/cash-flow-statement/%s?apikey=%s&limit=%s';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $key = $this->getCacheKey($request);

        $cachedCashFlowStatement = Cache::get($key);
        
        if (isset($cachedCashFlowStatement)) {
            return response()->json(json_decode($cachedCashFlowStatement), Response::HTTP_OK);
        }

        $isTTMRequest = false;
        $limit = (int) ($request->limit ?? 1);
        $period = $request->period;

        if (strtolower($period) == "ttm") {
            $isTTMRequest = true;
            $limit += 4;
        }

        $endpoint = sprintf(
            self::FMP_CASHFLOW_STATEMENT,
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

        if (!$response->ok()) {
            $response->throw()->json();
        }

        $data = $response->json();
        if (count($data)) {
            if ($isTTMRequest) {
                // $data = $this->calculateIncomeStatementTTM($data, $limit);
            }
            Cache::put($key, json_encode($data));
            return response()->json($data, Response::HTTP_CREATED);
        }
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
                'cash-flow-statement',
                strtolower($request->period),
                strtolower($request->security),
                $request->limit ?? 1
            ]
        );
    }
}
