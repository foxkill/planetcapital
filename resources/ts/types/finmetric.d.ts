//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
// import IIncomeStatement from "./income-statement"

import ICashflowStatement from "./cashflow-statement"
import IRatio from "./ratio"

type PastGrowthLineItems = Pick<IIncomeStatement, "revenue" | "operatingIncome" | "netIncome">
type PastGrowthLineItem = keyof PastGrowthLineItems
type PastGrowthMetric = Partial<Record<PastGrowthLineItem, string>>

type ReturnOnCapitalLineItems = Pick<IRatio, "returnOnEquity" | "returnOnAssets" | "returnOnCapitalEmployed">
type ReturnOnCapitalLineItem = keyof ReturnOnCapitalLineItems
type ReturnOnCapitalMetric = Partial<Record<ReturnOnCapitalLineItem, string>>

type MarginLineItems = Pick<IRatio, "grossProfitMargin" | "operatingProfitMargin" | "netProfitMargin" >
type MarginLineItem = keyof MarginLineItems
type MarginMetric = Partial<Record<MarginLineItem, string>>

type CashFlowLineItems = Pick<ICashflowStatement, "operatingCashFlow" | "capitalExpenditure" | "freeCashFlow">
type CashFlowLineItem = keyof CashFlowLineItems
type CashFlowMetric = Partial<Record<CashFlowLineItem, string>>

