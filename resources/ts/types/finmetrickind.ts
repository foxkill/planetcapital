//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

const FinMetricKind = {
    NONE: "NONE",
    BALANCE: "BALANCE",
    INCOME: "INCOME",
    CASH: "CASH",
    RATIO: "RATIO"
} as const

type FinMetricType = typeof FinMetricKind[keyof typeof FinMetricKind]

export { FinMetricKind, type FinMetricType }