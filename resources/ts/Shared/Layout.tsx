import React, { useState } from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Navbar from './Navbar';
import Cards from './Cards';
import SecurityContext from './SecurityContext';
import useFetch from '../useFetch';
import { Information } from '@/types/app';
import ISecurity from '@/types/security';

const Layout = () => {
    const [endPoint, setEndPoint] = useState("")

    const info = useFetch(endPoint) as Information

    return (
        <>
            <Navbar />
            <SecurityContext.Provider value={{endPoint, setEndPoint}}>
            <Hero />
            <Cards visible={!!info.data} data={info.data as ISecurity}/>
            </SecurityContext.Provider>
            <Footer />
        </>
    )
}

export default Layout;