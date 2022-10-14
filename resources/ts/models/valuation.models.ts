//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { SecurityProperties } from "@/types/security";

const valuations: Record<string, SecurityProperties>[] = [
    { 'p/e': 'priceEarningsRatio' },
    { 'peg': 'priceEarningsToGrowthRatio' },
    { 'p/s': 'priceSalesRatio' },
    { 'p/b': 'priceToBookRatio' },
    { 'p/ocf': 'priceToOperatingCashFlowsRatio' },
    { 'p/fcf': 'priceToFreeCashFlowsRatio' },
    { 'cash ratio': 'cashRatio' }
]

export default valuations