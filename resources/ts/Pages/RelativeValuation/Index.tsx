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
import HugeHeader from "@/Shared/HugeHeader";

type RelativeValuationProperties = {
    exchange: string,
    symbol: string
}

function RelativeValuation({ exchange, symbol }: RelativeValuationProperties): JSX.Element {
    return (
        <>
            <Hero height={30}>
                <CompanyInfo />
                <SelectPeriod />
            </Hero>
            <Hero useColumnLayout={false} height={60}>
                <HugeHeader>Valuation Multiples</HugeHeader>
                <Cards valuations={valuations}>&nbsp;</Cards>
            </Hero>
        </>
    )
}

RelativeValuation.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default RelativeValuation