//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import ICashflowStatement from "@/types/cashflow-statement";
import { IKeyMetric } from "@/types/key-metric";
import IRatio, { RatioProperties } from "@/types/ratio";

type K = IKeyMetric | IRatio | ICashflowStatement
type RatioCalculationFunc = <T extends K>(data: T[], numerator: string, denominator: string) => number

const valuations: Record<string, RatioProperties>[] = [
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

const ratio: RatioCalculationFunc = <T>(data: T, numerator: string, denominator: string): number => {
    return data[numerator] / data[denominator]
}

// ev/gp - Enterprice Value / Gross Profit
// ev/fcff - Enterprice Value / Free Cash Flow To Firm
// ev/fcfe - Enterprice Value / Free Cash Flow To Equity
// ev/ic - Enterprice Value / Investing Capital
// ev - IKeyMetric
const enterpriseValuations: Record<string, keyof IKeyMetric | RatioCalculationFunc | "-">[] = [
    { "ev/s": "evToSales" },
    { "ev/ocf": "evToOperatingCashFlow" },
    { "ev/fcf": "evToFreeCashFlow" },
    { "ev/ebit": "-" },
    { "ev/ic": "-" },
    { "ev/fcff": "-" },
    { "ev/gp": ratio }
]

export type Valuations = typeof valuations
export {enterpriseValuations}
export default valuations