//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"

interface IRatioCard {
    children: React.ReactNode
    caption: string
    symbol: string
}

function RatioCard({symbol, caption, children}: IRatioCard): JSX.Element {
    return (
        <div className="card card-bordered bg-base-100 hover:shadow-xl p-8">
            <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-xl font-bold">
                {caption}
                <div className="text-slate-400 !font-medium block">
                    {symbol}
                </div>
            </div>
            <div className="text-center text-5xl">{children}</div>
        </div>
    )
}

export default RatioCard