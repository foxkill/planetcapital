//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
declare interface IAnalystEstimate {
    symbol: string;
    date: string;
    estimatedRevenueLow: number;
    estimatedRevenueHigh: number;
    estimatedRevenueAvg: number;
    estimatedEbitdaLow: number;
    estimatedEbitdaHigh: number;
    estimatedEbitdaAvg: number;
    estimatedEbitLow: number;
    estimatedEbitHigh: number;
    estimatedEbitAvg: number;
    estimatedNetIncomeLow: number;
    estimatedNetIncomeHigh: number;
    estimatedNetIncomeAvg: number;
    estimatedSgaExpenseLow: number;
    estimatedSgaExpenseHigh: number;
    estimatedSgaExpenseAvg: number;
    estimatedEpsAvg: number;
    estimatedEpsHigh: number;
    estimatedEpsLow: number;
    numberAnalystEstimatedRevenue: number;
    numberAnalystsEstimatedEps: number;
}

export default IAnalystEstimate