//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react";
import { useSecurity } from "../SecurityContext/SecurityContext";

interface IHeroProperties {
    children?: React.ReactNode
    useColumnLayout?: boolean
    height?: number
    contextAware?: boolean
    onTop?: boolean
}

export function Hero({ children, useColumnLayout, height, contextAware, onTop }: IHeroProperties): JSX.Element | null {
    const ctx = useSecurity()

    if (contextAware) {
        if (! ctx.context.symbol && !ctx.context.exchange) {
            return null
        }
    }

    const h = !height ? "min-h-screen" : `min-h-[${height}vh]`
    const align = onTop ? "items-start" : ""
    return (
        <>
            <div className={`hero bg-base-200 ${h} ${align}`}>
                <div className={`hero-content ${useColumnLayout ? "flex-col lg:flex-row-reverse lg:gap-16" : "flex-col"}`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Hero