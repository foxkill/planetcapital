//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"
import Layout from "@/Shared/Layout";
import Hero from "@/Shared/Hero";
import Cards from "@/Shared/Cards";
import CompanyInfo from "@/Shared/CompanyInfo";
import TickerSearch from "@/Shared/TickerSearch";
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod";
import {valuations, ttmValuations, enterpriseValuations, enterpriseValuationsTTM} from "@/models/valuation.models";
import HugeHeader from "@/Shared/HugeHeader";
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext";

function App(): JSX.Element {
    const { context } = useSecurity()
    return (
        <>
            <Hero useColumnLayout={true} height={60}><TickerSearch></TickerSearch></Hero>
            <Hero height={30}><CompanyInfo /></Hero>
            <Hero height={30} contextAware>
                <HugeHeader>Valuation Multiples</HugeHeader>
                <SelectPeriod></SelectPeriod>
            </Hero>
            <Hero useColumnLayout={false} height={60}>
                <Cards 
                    valuations={context.periodType === "TTM" ? ttmValuations : valuations} 
                    enterpriseValuations={context.periodType === "TTM" ? enterpriseValuationsTTM : enterpriseValuations}>
                </Cards>
            </Hero>
        </>
    )
}

App.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default App