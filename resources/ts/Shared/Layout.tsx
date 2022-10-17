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

const Layout = (): JSX.Element => {
    return (
        <>
            <Navbar />
            <QueryClientProvider client={qc}>
                <SecurityContextProvider>
                    <Hero><TickerSearch></TickerSearch></Hero>
                    <Hero>
                        {/* <div className="flex justify-center items-center pb-10"> */}
                        <CompanyInfo>No Company</CompanyInfo>
                        {/* </div> */}
                    </Hero>
                    <Cards />
                </SecurityContextProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
            <Footer />
        </>
    )
}

export default Layout;