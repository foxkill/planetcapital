//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import IIncomeStatement from "@/types/income-statement"
import IRatio from "@/types/ratio"
import React from "react"
import { PaletteColors } from "react-palette"
import { useQuery } from "react-query"
import ExtendedHistoryChart from "../Charts/ExtendedHistoryChart"
import InfoCard from "../InfoCard"
import Spinner from "../Spinner"

interface IProfitablityOverview {
    symbol: string
    exchange: string
    periodType: string
    limit: number
    companyName: string
    metrics: any[]
    metricKind?: string,
    palette: PaletteColors
}

const ProfitablityOverview: React.FC<IProfitablityOverview> = (props) => {
    const { symbol, exchange, periodType, limit, companyName, palette, metrics } = props

    let query: unknown
    let key = ""

    if (props.metricKind === "INCOME") {
        // Code
        key = ["income-statement", symbol, exchange, periodType, limit].join("-").toLocaleLowerCase()
        query = useQuery<IIncomeStatement[]>(
            [key, { exchange, symbol, periodType, limit }],
            fetchIncomeStatement,
            {
                enabled: Boolean(symbol && exchange),
                retry: false,
            }
        )
    } else {
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
    }
    return (<>
        {
            metrics.map((value, index) => {
                return (
                    <InfoCard
                        key={index}
                        header={value.metric}
                        subheader={companyName}
                        image={`/api/security/${exchange.toLocaleLowerCase()}/${symbol.toLowerCase()}/image`}>
                        {
                            query.isLoading
                                ? (<div className="w-96 h-52 min-w-full text-center pt-12"><Spinner width={24} height={24} /></div>)
                                : (<ExtendedHistoryChart
                                    metric={value.metric}
                                    metrics={query.data!}
                                    metricKey={value.metricKey}
                                    metricKind={props.metricKind!}
                                    periodType={periodType}
                                    palette={palette}
                                />)
                        }
                    </InfoCard>
                )
            })
        }</>)
}

export default ProfitablityOverview