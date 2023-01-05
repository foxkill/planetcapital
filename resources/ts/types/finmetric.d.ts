//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
// import IIncomeStatement from "./income-statement"

import ICashflowStatement from "./cashflow-statement"
import IIncomeStatement from "./income-statement"
import IRatio from "./ratio"

type Metric<T, K, R> = Partial<Record<keyof Pick<T, K>, R>>

type PastGrowthMetric = Metric<IIncomeStatement, "revenue" | "operatingIncome" | "netIncome", string>
type ReturnOnCapitalMetric = Metric<IRatio, "returnOnEquity" | "returnOnAssets" | "returnOnCapitalEmployed">
type MarginMetric = Matric<IRatio, "grossProfitMargin" | "operatingProfitMargin" | "netProfitMargin", string>
type CashFlowMetric = Metric<ICashflowStatement, "operatingCashFlow" | "capitalExpenditure" | "freeCashFlow", string>

