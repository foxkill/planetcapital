import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Navbar from './Navbar';
import Cards from './Cards';
import { SecurityContextProvider } from './SecurityContext/SecurityContext';
import qc from "../planetapi/queryclient"
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import CompanyInfo from './CompanyInfo';
import TickerSearch from './TickerSearch';
import SelectPeriod from './SelectPeriod/SelectPeriod';

const Layout = (): JSX.Element => {
    return (
        <>
            <Navbar />
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
            <Footer />
        </>
    )
}

export default Layout;