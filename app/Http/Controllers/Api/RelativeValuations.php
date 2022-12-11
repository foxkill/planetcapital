<?php

namespace App\Http\Controllers\Api;

use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

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

        $cachedSecurity = Cache::get($key);

        // Use cached entry if available.
        if (isset($cachedSecurity)) {
            $data = json_decode($cachedSecurity);
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

        if (!$response->ok()) {
            $response->throw()->json();
        }

        $data = $response->json();

        if (0 == count($data)) {
            throw new \RuntimeException("No data available from endpoint");
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
}
