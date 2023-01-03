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
import React from "react"
import { PaletteColors } from "react-palette"
import { useQuery, UseQueryResult } from "react-query"
import ExtendedHistoryChart from "../Charts/ExtendedHistoryChart"
import InfoCard from "../InfoCard"
import Spinner from "../Spinner"
import ValueIndicator from "../ValueIndicator/ValueIndicator"

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

const ProfitablityOverview: React.FC<IProfitablityOverview> = (props) => {
    const { symbol, exchange, periodType, limit, companyName, palette, metrics } = props

    let query: UseQueryResult
    let key = ""
    const performance = [{ 1: 0 }, { 3: 0 }, { 5: 0 }]
    const fractionDigits = 0

    switch (props.metricKind) {
        case FinMetricKind.INCOME:
            key = ["income-statement", symbol, exchange, periodType, limit].join("-").toLocaleLowerCase()
            query = useQuery<IIncomeStatement[]>(
                [key, { exchange, symbol, periodType, limit }],
                fetchIncomeStatement,
                {
                    enabled: Boolean(symbol && exchange),
                    retry: false,
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
                    onSuccess() {
                        // if (periodType === "QTR") {
                        // console.log(data.map((v) => v.returnOnEquity));
                        // }
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
                console.log(metricKey, metric, query.data);

                return (
                    <InfoCard
                        key={index}
                        header={metric}
                        subheader={companyName}
                        image={`/api/security/${exchange.toLocaleLowerCase()}/${symbol.toLowerCase()}/image`}>
                        {
                            query.isLoading
                                ? (<div className="w-96 h-52 min-w-full text-center pt-12"><Spinner width={24} height={24} /></div>)
                                : (<>
                                    <ExtendedHistoryChart
                                        key={index}
                                        metric={metric}
                                        metrics={query.data! as IRatio[]}
                                        metricKey={metricKey}
                                        metricKind={props.metricKind!}
                                        periodType={periodType}
                                        palette={palette}
                                    />
                                    <table className="table table-compact w-full text-slate-500 z-0">
                                        <tbody>
                                            {performance.map((perf) => {
                                                const [key, value] = Object.entries(perf)[0]
                                                return (<>
                                                    <tr key={key} className="hover">
                                                        <th className="rounded-none">{key} {parseInt(key) > 1 ? "Years" : "Year"}</th>
                                                        <td className="rounded-none text-right border-b-0 w-28">
                                                            <ValueIndicator unit="%">{Number.isNaN(value) ? "N/A" : value.toFixed(fractionDigits)}</ValueIndicator>
                                                        </td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                )
                        }
                    </InfoCard>
                )
            })
        }</>)
}

export default ProfitablityOverview