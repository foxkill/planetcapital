//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// httpsTTM://github.com/foxkill/planetcapital
// Closed Source
//

declare interface IIncomeStatementTTM {
    dateTTM: string;
    symbolTTM: string;
    reportedCurrencyTTM: string;
    cikTTM: string;
    fillingDateTTM: string;
    acceptedDateTTM: string;
    calendarYearTTM: string;
    periodTTM: string;
    revenueTTM: number;
    costOfRevenueTTM: number;
    grossProfitTTM: number;
    grossProfitRatioTTM: number;
    researchAndDevelopmentExpensesTTM: number;
    generalAndAdministrativeExpensesTTM: number;
    sellingAndMarketingExpensesTTM: number;
    sellingGeneralAndAdministrativeExpensesTTM: number;
    otherExpensesTTM: number;
    operatingExpensesTTM: number;
    costAndExpensesTTM: number;
    interestIncomeTTM: number;
    interestExpenseTTM: number;
    depreciationAndAmortizationTTM: number;
    ebitdaTTM: number;
    ebitdaratioTTM: number;
    operatingIncomeTTM: number;
    operatingIncomeRatioTTM: number;
    totalOtherIncomeExpensesNetTTM: number;
    incomeBeforeTaxTTM: number;
    incomeBeforeTaxRatioTTM: number;
    incomeTaxExpenseTTM: number;
    netIncomeTTM: number;
    netIncomeRatioTTM: number;
    epsTTM: number;
    epsdilutedTTM: number;
    weightedAverageShsOutTTM: number;
    weightedAverageShsOutDilTTM: number;
    linkTTM: string;
    finalLinkTTM: string;
}