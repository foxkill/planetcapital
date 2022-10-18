//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { RatioProperties } from "@/types/ratio";

const valuations: Record<string, RatioProperties>[] = [
    { 'p/e': 'priceEarningsRatio' },
    { 'peg': 'priceEarningsToGrowthRatio' },
    { 'p/s': 'priceSalesRatio' },
    { 'p/b': 'priceToBookRatio' },
    { 'p/ocf': 'priceToOperatingCashFlowsRatio' },
    { 'p/fcf': 'priceToFreeCashFlowsRatio' },
    { 'cash ratio': 'cashRatio' },
    { 'current ratio': 'currentRatio' },
    { 'quick ratio': 'quickRatio' },
]

export default valuations