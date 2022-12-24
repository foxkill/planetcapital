//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import IIncomeStatement from "@/types/income-statement"
import cagr from "./cagr"

function calculateCagr(data: IIncomeStatement[], dataKey: string, periods: number, periodType: string): number {
    let index = periods

    if (periodType != "FY") {
        index = periods << 2
    } 

    const currentValue = data[0][dataKey]
    const priorValue = data[index][dataKey]

    return cagr(priorValue, currentValue, periods).percentage
}

function calculateAverage(data: IIncomeStatement[], dataKey: string, length: number): number {
    let sum = 0
    for (let i = 0; i < length; i++) {
        sum += data[i][dataKey]
    }

    return sum / length
}

export {calculateCagr, calculateAverage}