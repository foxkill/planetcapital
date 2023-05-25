//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import ICashflowStatement from "@/types/cashflow-statement";
import { IKeyMetric } from "@/types/key-metric";
import { IKeyMetricTTM } from "@/types/key-metric.ttm";
import IRatio, { RatioProperties } from "@/types/ratio";
import { TTMRatioProperties } from "@/types/ratio.ttm";

type K = IKeyMetric | IRatio | ICashflowStatement
type RatioCalculationFunc = <T extends K>(data: T[], numerator: string, denominator: string) => number

type RatioRecord = Record<string, RatioProperties>

const valuations: RatioRecord[] = [
    { "p/s": "priceToSalesRatio" },
    { "p/e": "priceEarningsRatio" },
    { "p/ocf": "priceToOperatingCashFlowsRatio" },
    { "p/fcf": "priceToFreeCashFlowsRatio" },
    { "p/b": "priceToBookRatio" },
    { "peg": "priceEarningsToGrowthRatio" },
    { "cash ratio": "cashRatio" },
    { "current ratio": "currentRatio" },
    { "quick ratio": "quickRatio" },
]

type RatioTTMRecord = Record<string, TTMRatioProperties>

const ttmValuations: RatioTTMRecord[] = [
    { "p/s": "priceToSalesRatioTTM" },
    { "p/e": "peRatioTTM" },
    { "p/ocf": "priceToOperatingCashFlowsRatioTTM" },
    { "p/fcf": "priceToFreeCashFlowsRatioTTM" },
    { "p/b": "priceToBookRatioTTM" },
    { "peg": "priceEarningsToGrowthRatioTTM" },
    { "cash ratio": "cashRatioTTM" },
    { "current ratio": "currentRatioTTM" },
    { "quick ratio": "quickRatioTTM" },
]

const ratio: RatioCalculationFunc = <T>(data: T, numerator: string, denominator: string): number => {
    return data[numerator] / data[denominator]
}

// ev/gp - Enterprice Value / Gross Profit
// ev/fcff - Enterprice Value / Free Cash Flow To Firm
// ev/fcfe - Enterprice Value / Free Cash Flow To Equity
// ev/ic - Enterprice Value / Investing Capital
// ev - IKeyMetric
type EnterpriseRecord = Record<string, keyof IKeyMetric | RatioCalculationFunc | "-">

const enterpriseValuations: EnterpriseRecord[] = [
    { "ev/s": "evToSales" },
    { "ev/ocf": "evToOperatingCashFlow" },
    { "ev/fcf": "evToFreeCashFlow" },
    { "ev/ebit": "-" },
    { "ev/ic": "-" },
    { "ev/fcff": "-" },
    { "ev/gp": "-" }
]

type EnterpriseRecordTTM = Record<string, keyof IKeyMetricTTM | RatioCalculationFunc | "-">
const enterpriseValuationsTTM: EnterpriseRecordTTM[] = [
    { "ev/s": "evToSalesTTM" },
    { "ev/ocf": "evToOperatingCashFlowTTM" },
    { "ev/fcf": "evToFreeCashFlowTTM" },
    { "ev/ebit": "-" },
    { "ev/ic": "-" },
    { "ev/fcff": "-" },
    { "ev/gp": "-" }
]

// const isOfRatioType = <T>(context: any, d: keyof T): d is T[] => true

export { 
    valuations, 
    ttmValuations, 
    enterpriseValuations, 
    enterpriseValuationsTTM, 
    type RatioRecord, 
    type RatioTTMRecord, 
    type EnterpriseRecord, 
    type EnterpriseRecordTTM
}