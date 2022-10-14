import React, { useState } from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Navbar from './Navbar';
import Cards from './Cards';
import { SecurityContextProvider } from './SecurityContext/SecurityContext';
import SelectPeriod from './SelectPeriod/SelectPeriod';
import qc from "../planetapi/queryclient"
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
const Layout = () => {
    // const [endPoint, setEndPoint] = useState<string>("")
    // const info = useFetch(endPoint) as Information

    return (
        <>
            <Navbar />
            <QueryClientProvider client={qc}>
                <SecurityContextProvider>
                    <Hero />
                    <SelectPeriod />
                    <Cards />
                </SecurityContextProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
            <Footer />
        </>
    )
}

export default Layout;