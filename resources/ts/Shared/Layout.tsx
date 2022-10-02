import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Navbar from './Navbar';
import Info from './Info';
import useFetch from '../useFetch';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Footer />
        </>
    )
}

export default Layout;