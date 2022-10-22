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
import { SecurityContextProvider, useSecurity } from "@/Shared/SecurityContext/SecurityContext";
import qc from "@/planetapi/queryclient"
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CompanyInfo from "@/Shared/CompanyInfo";
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod";

interface IRelativeValuationProperties {
    exchange: string,
    symbol: string
}

// <Hero useColumnLayout={true} height={60}><TickerSearch></TickerSearch></Hero>

function RelativeValuation({ exchange, symbol }: IRelativeValuationProperties): JSX.Element {
    const ctx = useSecurity()

    console.log(ctx);
    console.log(exchange, symbol)

    if (ctx.setContext) {
        ctx.setContext({...ctx.context, symbol, exchange })
    }

    return <Layout>
        <QueryClientProvider client={qc}>
            <SecurityContextProvider>
                <Hero height={30}><CompanyInfo /></Hero>
                <Hero useColumnLayout={false} height={60}>
                    <Cards>
                        2. Valuation Multiples
                        {/* <SelectPeriod></SelectPeriod> */}
                    </Cards>
                </Hero>
            </SecurityContextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </Layout>
}

export default RelativeValuation