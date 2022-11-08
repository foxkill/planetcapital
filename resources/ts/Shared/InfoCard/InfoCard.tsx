//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"

interface InfoCardProperties {
    children: React.ReactNode
    colSpan: string
    caption: string
    ratio: string
}

function InfoCard({children, colSpan, caption, ratio}: InfoCardProperties): JSX.Element {
    return (
        <div className={`card card-bordered bg-base-100 pt-4 pb-4 ${colSpan}`}>
            <figure>
                <h2 className="text-lg p-4 font-bold -mt-6 w-full">
                    {caption}
                    <div className="text-sm font-thin">{ratio}</div>
                    <hr className="mt-1"></hr>
                </h2>
            </figure>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default InfoCard