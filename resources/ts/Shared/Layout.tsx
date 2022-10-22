//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayoutProperities {
    children: React.ReactNode
}
const Layout = ({ children }: ILayoutProperities): JSX.Element => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;