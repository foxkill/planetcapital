import React, { useState } from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Navbar from './Navbar';
import Cards from './Cards';
import SecurityContext from './SecurityContext';
import useFetch from '../useFetch';
import { Information } from '@/types/app';

const Layout = () => {
    const [endPoint, setEndPoint] = useState("")

    const info = useFetch(endPoint) as Information

    return (
        <>
            <Navbar />
            <SecurityContext.Provider value={{endPoint, setEndPoint}}>
            <Hero />
            <Cards visible={true} data={info.data as unknown as ISecurity}/>
            </SecurityContext.Provider>
            <Footer />
        </>
    )
}

export default Layout;