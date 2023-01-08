//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

declare interface IKeyMetric {
    symbol: string;
    date: string;
    period: string;
    revenuePerShare: number;
    netIncomePerShare: number;
    operatingCashFlowPerShare: number;
    freeCashFlowPerShare: number;
    cashPerShare: number;
    bookValuePerShare: number;
    tangibleBookValuePerShare: number;
    shareholdersEquityPerShare: number;
    interestDebtPerShare: number;
    marketCap: number;
    enterpriseValue: number;
    peRatio: number;
    priceToSalesRatio: number;
    pocfratio: number;
    pfcfRatio: number;
    pbRatio: number;
    ptbRatio: number;
    evToSales: number;
    enterpriseValueOverEBITDA: number;
    evToOperatingCashFlow: number;
    evToFreeCashFlow: number;
    earningsYield: number;
    freeCashFlowYield: number;
    debtToEquity: number;
    debtToAssets: number;
    netDebtToEBITDA: number;
    currentRatio: number;
    interestCoverage: number;
    incomeQuality: number;
    dividendYield?: number;
    payoutRatio: number;
    salesGeneralAndAdministrativeToRevenue: number;
    researchAndDdevelopementToRevenue: number;
    intangiblesToTotalAssets: number;
    capexToOperatingCashFlow: number;
    capexToRevenue: number;
    capexToDepreciation: number;
    stockBasedCompensationToRevenue: number;
    grahamNumber: number;
    roic: number;
    returnOnTangibleAssets: number;
    grahamNetNet: number;
    workingCapital: number;
    tangibleAssetValue: number;
    netCurrentAssetValue: number;
    investedCapital: number;
    averageReceivables: number;
    averagePayables: number;
    averageInventory: number;
    daysSalesOutstanding: number;
    daysPayablesOutstanding: number;
    daysOfInventoryOnHand: number;
    receivablesTurnover: number;
    payablesTurnover: number;
    inventoryTurnover: number;
    roe: number;
    capexPerShare: number;
}

declare type KeyMetricProperites = keyof IKeyMetric

export { IKeyMetric, type KeyMetricProperites }