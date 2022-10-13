//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { TickerSearch } from '../TickerSearch/TickerSearch';
import React, { useContext } from "react";
import securityContext from '../SecurityContext';

export function Hero(): JSX.Element {
    const ctx = useContext(securityContext)
    return (
        <>
            <div className={
                "hero bg-base-200 " + (ctx.context.information.data ? "min-h-[60vh]" : "min-h-screen")
                }>
                <div className="hero-content flex-col lg:flex-row-reverse lg:gap-16">
                    <TickerSearch />
                </div>
            </div>
        </>
    )
}

export default Hero