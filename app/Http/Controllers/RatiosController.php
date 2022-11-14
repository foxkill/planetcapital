<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RatiosController extends Controller
{
    public function index(Request $req)
    {
        Inertia::setRootView('layouts.app');
        return inertia(
            'RelativeValuation/Ratio/Index', 
            [
                'ratioCamelCaseName' => $this->ratioToCamelCaseName($req->ratio),
                'ratioExplicitName' => $this->ratioToExplicitName($req->ratio),
                'ratioDefinition' => $this->ratioDefinition($req->ratio),
                'ratioShortName' => $this->ratioToShortName($req->ratio),
                'ratioFormula' => $this->ratioFormula($req->ratio),
                'exchange' => $req->exchange,
                'symbol' => $req->symbol,
                'ratio' => $this->ratioToExplicitName($req->ratio),
            ]
        );
    }

    protected function ratioToExplicitName($ratio)
    {
        $parts = explode('-', $ratio);
        $names = array_map(function ($value) {
            if ($value == 'to') {
                return $value;
            }

            return ucfirst($value);
        }, $parts);

        return implode(' ', $names);
    }

    protected function ratioToShortName($ratio)
    {
        $valuations = [
            "priceEarningsRatio" =>  "p/e",
            "priceEarningsToGrowthRatio" => "peg",
            "priceToSalesRatio" => "p/s",
            "priceToBookRatio" => "p/b",
            "priceToOperatingCashFlowsRatio" => "p/ocf",
            "priceToFreeCashFlowsRatio" => "p/fcf",
            "cashRatio" => "cash ratio",
            "currentRatio" => "current ratio",
            "quickRatio" => "quick ratio",
        ];

        $camelCaseKey = $this->ratioToCamelCaseName($ratio);

        $valuation = array_key_exists($camelCaseKey, $valuations) 
            ? $valuations[$camelCaseKey]
            : '';
        
        return strtoupper($valuation);
    }

    protected function ratioToCamelCaseName($ratio) 
    {
        $parts = explode('-', $ratio);
        $names = array_map(function ($value) {
            return ucfirst($value);
        }, $parts);

        return lcfirst(implode('', $names));
    } 

    protected function ratioDefinition($ratio) 
    {
       $definitions = [
            "priceEarningsRatio" =>  "ratio is a valuation multiple that compares a company’s market capitalization to its net income. It indicates the dollar amount an investor can expect to invest in a company in order to receive $1 of that company’s earnings.",
            "priceEarningsToGrowthRatio" => "peg",
            "priceToSalesRatio" => "ratio is a valuation multiple that compares a company’s market capitalization to its revenues. It is an indicator of the value that financial markets have placed on each dollar of a company’s sales.",
            "priceToBookRatio" => "ratio is a valuation multiple that measures the market's valuation of a company relative to its book value. The P/B ratio is only considered useful in practice when applied to capital-intensive businesses.",
            "priceToOperatingCashFlowsRatio" => "p/ocf",
            "priceToFreeCashFlowsRatio" => "p/fcf",
            "cashRatio" => "cash ratio",
            "currentRatio" => "current ratio",
            "quickRatio" => "quick ratio",
        ];

        $camelCaseKey = $this->ratioToCamelCaseName($ratio);

        return array_key_exists($camelCaseKey, $definitions) 
            ? $definitions[$camelCaseKey]
            : '';
    }

    protected function ratioFormula($ratio) 
    {
       $formula = [
            "priceEarningsRatio" =>  "p/e",
            "priceEarningsToGrowthRatio" => "peg",
            "priceToSalesRatio" => "p/s",
            "priceToBookRatio" => "p/b",
            "priceToOperatingCashFlowsRatio" => "p/ocf",
            "priceToFreeCashFlowsRatio" => "p/fcf",
            "cashRatio" => "cash ratio",
            "currentRatio" => "current ratio",
            "quickRatio" => "quick ratio",
        ];

        $camelCaseKey = $this->ratioToCamelCaseName($ratio);

        return array_key_exists($camelCaseKey, $formula) 
            ? $formula[$camelCaseKey]
            : '';
    }
}
