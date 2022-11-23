//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

function cagr(startValue: number, endValue: number, nPeriod: number): ICagr {
    //   enforceNumber(opts);
    if (!startValue || !endValue || !nPeriod) {
        throw new Error("Start value, end value and years are required and must be numbers.");
    }

    let result: ICagr = {
        raw: 0,
        rounded: 0,
        percentage: 0
    }

    result.raw = Math.pow(endValue / startValue, 1 / nPeriod) - 1
    result.rounded = Math.round(result.raw * 1000) / 1000
    result.percentage = result.rounded * 100;

    return result;
}

export default cagr