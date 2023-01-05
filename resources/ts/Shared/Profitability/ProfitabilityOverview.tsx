//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import fetchCashFlowStatement from "@/planetapi/fetch.cash-flow-statement"
import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import ICashflowStatement from "@/types/cashflow-statement"
import { FinMetricKind, FinMetricType } from "@/types/finmetrickind"
import IIncomeStatement from "@/types/income-statement"
import IRatio from "@/types/ratio"
import handleZero from "@/utils/handlezero"
import { calculateCagr } from "@/utils/preparecalc"
import React, { useState } from "react"
import { PaletteColors } from "react-palette"
import { useQuery, UseQueryResult } from "react-query"
import ExtendedHistoryChart from "../Charts/ExtendedHistoryChart"
import InfoCard from "../InfoCard"
import PerformanceTable from "../Performance/performance"
import Spinner from "../Spinner"

interface IProfitablityOverview {
    symbol: string
    exchange: string
    periodType: string
    limit: number
    companyName: string
    metrics: any[]
    metricKind?: FinMetricType
    palette: PaletteColors,
    showPerformanceTable?: boolean
}

function calculatePerformance(props: IProfitablityOverview, data: IIncomeStatement[] | IRatio[] | ICashflowStatement[]): Map<string, number> | void {
    if (!props.showPerformanceTable) {
        return;
    }

    const pf = new Map()

    props.metrics.map((value) => {
        const [metricKey] = Object.entries<string>(value)[0];
        const performance = [
            { 1: 0 },
            { 3: 0 },
            { 5: 0 },
        ]


        // TODO: query the correct length of the data in the calculateCagr function.
        if (data && data.length >= 6) {
            performance[2][5] = handleZero(calculateCagr(data, metricKey, 5, props.periodType))
        }

        if (data && data.length >= 4) {
            performance[1][3] = handleZero(calculateCagr(data, metricKey, 3, props.periodType))
        }

        if (data && data.length >= 2) {
            performance[0][1] = handleZero(calculateCagr(data, metricKey, 1, props.periodType))
        }

        pf.set(metricKey, performance)
    })

    return pf
}

const ProfitablityOverview: React.FC<IProfitablityOverview> = (props) => {
    const { symbol, exchange, periodType, limit, companyName, palette, metrics } = props

    let query: UseQueryResult
    let key = ""

    const [perf, setPerf] = useState<Map<string, number> | number>(0)

    switch (props.metricKind) {
        case FinMetricKind.INCOME:
            key = ["income-statement", symbol, exchange, periodType, limit].join("-").toLocaleLowerCase()
            query = useQuery<IIncomeStatement[]>(
                [key, { exchange, symbol, periodType, limit }],
                fetchIncomeStatement,
                {
                    enabled: Boolean(symbol && exchange),
                    retry: false,
                    onSuccess(data) {
                        const pf = calculatePerformance(props, data)
                        if (pf) {
                            setPerf(pf)
                        }
                    }
                }
            )
            break;
        case FinMetricKind.RATIO:
            key = ["ratios", symbol, exchange, periodType, limit].join("-").toLocaleLowerCase()
            query = useQuery<IRatio[]>(
                [
                    key,
                    { symbol, exchange, periodType, limit }
                ],
                fetchFinancialRatios,
                {
                    enabled: Boolean(symbol && exchange),
                    retry: false,
                    onSuccess(data) {
                        const pf = calculatePerformance(props, data)
                        if (pf) {
                            setPerf(pf)
                        }
                    },
                }
            )
            break;

        case FinMetricKind.CASH:
            key = ["cash-flow-statement", symbol, exchange, periodType, limit].join("-").toLowerCase()
            query = useQuery<ICashflowStatement[]>(
                [key, { exchange, symbol, periodType, limit }],
                fetchCashFlowStatement,
                {
                    enabled: Boolean(symbol && exchange),
                    retry: false,
                    onSuccess(data) {
                        const pf = calculatePerformance(props, data)
                        if (pf) {
                            setPerf(pf)
                        }
                    },
                }
            )
            break;
        default:
            break;
    }

    return (<>
        {
            metrics.map((value, index) => {
                const [metricKey, metric] = Object.entries<string>(value)[0];
                return (
                    <InfoCard
                        key={index}
                        header={metric}
                        subheader={companyName}
                        image={`/api/security/${exchange.toLocaleLowerCase()}/${symbol.toLowerCase()}/image`}>
                        {
                            query.isLoading
                                ? (<div className="w-96 h-52 min-w-full text-center pt-12"><Spinner width={24} height={24} /></div>)
                                : (
                                    <>
                                        <ExtendedHistoryChart
                                            key={metric}
                                            metric={metric}
                                            metrics={query.data! as IRatio[]}
                                            metricKey={metricKey}
                                            metricKind={props.metricKind!}
                                            periodType={periodType}
                                            palette={palette}
                                        />
                                        {perf
                                            ? <PerformanceTable key={metric} performance={(perf as Map<any, any>).get(metricKey) ?? []}></PerformanceTable>
                                            : <></>}
                                    </>
                                )
                        }
                    </InfoCard>
                )
            })
        }</>)
}

export default ProfitablityOverview