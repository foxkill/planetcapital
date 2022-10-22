//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"
// import Hero from "./Hero";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Cards from "./Cards";
// import { SecurityContextProvider } from "./SecurityContext/SecurityContext";
// import qc from "../planetapi/queryclient"
// import { QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
// import CompanyInfo from "./CompanyInfo";
// import TickerSearch from "./TickerSearch";
// import SelectPeriod from "./SelectPeriod/SelectPeriod";
import Hero from "@/Shared/Hero";
import Cards from "@/Shared/Cards";
import { SecurityContextProvider } from "@/Shared/SecurityContext/SecurityContext";
import qc from "@/planetapi/queryclient"
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CompanyInfo from "@/Shared/CompanyInfo";
import TickerSearch from "@/Shared/TickerSearch";
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod";
import { Head } from "@inertiajs/inertia-react"


export default function Index(): JSX.Element {
    return (
        <QueryClientProvider client={qc}>
            <SecurityContextProvider>
                <Hero useColumnLayout={true} height={60}><TickerSearch></TickerSearch></Hero>
                <Hero height={30}><CompanyInfo /></Hero>
                <Hero useColumnLayout={false} height={60}>
                    <Cards>
                        Valuation Multiples
                        <SelectPeriod></SelectPeriod>
                    </Cards>
                </Hero>
            </SecurityContextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}