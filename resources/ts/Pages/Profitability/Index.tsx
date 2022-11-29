//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import Layout from "@/Shared/Layout"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import React from "react"

interface IProfitabilityPageProps {
    symbol: string
    exchange: string
}

interface IPage<P extends IProfitabilityPageProps> extends React.FC<P> {
    layout?: (page: React.ReactNode) => JSX.Element
}
//
// Profitability Page
//
const Index: IPage<IProfitabilityPageProps> = () => {
    const { exchange, symbol, periodType } = useSecurity().context

    let limit = 10

    if (periodType === "QTR") {
        limit *= 2
    }

    return (<h1>{symbol} - {exchange} - {periodType} - {limit}</ h1>)
    // const { data } = usePalette(`/api/security/${exchange}/${symbol}/image`)
}

Index.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default Index