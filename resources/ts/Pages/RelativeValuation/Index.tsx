//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"
import Layout from "@/Shared/Layout"
import Hero from "@/Shared/Hero";
import Cards from "@/Shared/Cards";
import CompanyInfo from "@/Shared/CompanyInfo";
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod";
import valuations from "@/models/valuation.models";
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext";

interface IRelativeValuationProperties {
    exchange: string,
    symbol: string
}

// <Hero useColumnLayout={true} height={60}><TickerSearch></TickerSearch></Hero>

function RelativeValuation({ exchange, symbol }: IRelativeValuationProperties): JSX.Element {
    const ctx = useSecurity()
    if (ctx) {
        if (!ctx.context.symbol) {
            ctx.setContext({...ctx.context, symbol, exchange})
        }
    } 
    return (
        <>
            <Hero height={30}><CompanyInfo /></Hero>
            <Hero useColumnLayout={false} height={60}>
                <Cards valuations={valuations}>
                    2. Valuation Multiples
                    <SelectPeriod></SelectPeriod>
                </Cards>
            </Hero>
        </>
    )
}

RelativeValuation.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default RelativeValuation