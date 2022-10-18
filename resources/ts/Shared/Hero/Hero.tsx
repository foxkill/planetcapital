//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react";

interface IHeroProperties {
    children: React.ReactNode
    useColumnLayout?: boolean
    height?: number
}

export function Hero({ children, useColumnLayout, height }: IHeroProperties): JSX.Element {
    // const ctx = useContext(securityContext)
    const h = !height ? "min-h-screen" : `min-h-[${height}vh]`
    return (
        <>
            <div className={"hero bg-base-200 " + h}>
                <div className={`hero-content ${useColumnLayout ? "flex-col lg:flex-row-reverse lg:gap-16" : "flex-col"}`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Hero