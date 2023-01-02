//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
// import IIncomeStatement from "./income-statement"

type PastGrowthLineItems = Pick<IIncomeStatement, "revenue" | "operatingIncome" | "netIncome">
type PastGrowthLineItem = keyof PastGrowthLineItems
type PastGrowthMetric = Partial<Record<PastGrowthLineItem, string>>

