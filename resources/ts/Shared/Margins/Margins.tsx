//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import IRatio from "@/types/ratio"
import React from "react"
import { PaletteColors } from "react-palette"
import { useQuery } from "react-query"
import ExtendedHistoryChart from "../Charts/ExtendedHistoryChart"
import InfoCard from "../InfoCard"
import Spinner from "../Spinner"

interface IMarginProps {
    symbol: string
    exchange: string
    periodType: string
    limit: number
    companyName: string
    palette: PaletteColors
    metrics: any[]
}

const Margins: React.FC<IMarginProps> = (props) => {
    const { symbol, exchange, periodType, limit, companyName, palette, metrics } = props

    const ratiosQueryKey = ["ratios", symbol, exchange, periodType, limit].join("-").toLocaleLowerCase()
    const ratiosQuery = useQuery<IRatio[]>(
        [
            ratiosQueryKey,
            { symbol, exchange, periodType, limit }
        ],
        fetchFinancialRatios,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    return ratiosQuery.isLoading
        ? (<div><Spinner width={24} height={24} /></div>)
        : (<>{
            metrics.map((value, index) => {
                return (
                    <InfoCard
                        key={index}
                        header={value.metric}
                        subheader={companyName}
                        image={`/api/security/${exchange.toLocaleLowerCase()}/${symbol.toLowerCase()}/image`}>
                        <ExtendedHistoryChart
                            metric={value.metric}
                            metrics={ratiosQuery.data!}
                            metricKey={value.metricKey}
                            periodType={periodType}
                            palette={palette}
                        ></ExtendedHistoryChart>
                    </InfoCard>
                )
            })
        }</>)
}

export default Margins