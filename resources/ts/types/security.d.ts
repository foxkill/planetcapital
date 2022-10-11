//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//

declare interface ISecurity {
    id?: number
    symbol: string;
    date: Date;
    period: string;
    currentRatio: number;
    quickRatio: number;
    cashRatio: number;
    daysOfSalesOutstanding: number;
    daysOfInventoryOutstanding: number;
    operatingCycle: number;
    daysOfPayablesOutstanding: number;
    cashConversionCycle: number;
    grossProfitMargin: number;
    operatingProfitMargin: number;
    pretaxProfitMargin: number;
    netProfitMargin: number;
    effectiveTaxRate: number;
    returnOnAssets: number;
    returnOnEquity: number;
    returnOnCapitalEmployed: number;
    netIncomePerEBT: number;
    ebtPerEbit: number;
    ebitPerRevenue: number;
    debtRatio: number;
    debtEquityRatio: number;
    longTermDebtToCapitalization: number;
    totalDebtToCapitalization: number;
    interestCoverage: number;
    cashFlowToDebtRatio: number;
    companyEquityMultiplier: number;
    receivablesTurnover: number;
    payablesTurnover: number;
    inventoryTurnover: number;
    fixedAssetTurnover: number;
    assetTurnover: number;
    operatingCashFlowPerShare: number;
    freeCashFlowPerShare: number;
    cashPerShare: number;
    payoutRatio: number;
    operatingCashFlowSalesRatio: number;
    freeCashFlowOperatingCashFlowRatio: number;
    cashFlowCoverageRatios: number;
    shortTermCoverageRatios: number;
    capitalExpenditureCoverageRatio: number;
    dividendPaidAndCapexCoverageRatio: number;
    dividendPayoutRatio: number;
    priceBookValueRatio: number;
    priceToBookRatio: number;
    priceToSalesRatio: number;
    priceEarningsRatio: number;
    priceToFreeCashFlowsRatio: number;
    priceToOperatingCashFlowsRatio: number;
    priceCashFlowRatio: number;
    priceEarningsToGrowthRatio: number;
    priceSalesRatio: number;
    dividendYield: number;
    enterpriseValueMultiple: number;
    priceFairValue: number;
}

export declare type SecurityProperties = keyof ISecurity

// export declare type ShortCutType = ISecurity[keyof ISecurity]
// export declare type ShortCutType<T> = {
//     [P in keyof T]: T[P]
// }
// export declare type ShortCutIndexType = ShortCutType<ISecurity>

export default ISecurity