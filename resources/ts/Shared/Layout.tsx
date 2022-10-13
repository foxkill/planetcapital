import React, { useState } from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Navbar from './Navbar';
import Cards from './Cards';
import { SecurityContextProvider } from './SecurityContext/SecurityContext';

const Layout = () => {
    // const [endPoint, setEndPoint] = useState<string>("")
    // const info = useFetch(endPoint) as Information

    return (
        <>
            <Navbar />
            <SecurityContextProvider>
            <Hero />
            <Cards visible={true} />
            </SecurityContextProvider>
            <Footer />
        </>
    )
}

export default Layout;