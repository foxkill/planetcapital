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
    subheader: string
    icon?: React.ReactNode
    image?: string | undefined
}

function InfoCard({children, colSpan, caption, subheader, icon, image }: InfoCardProperties): JSX.Element {
    return (
        <div className={`card card-bordered bg-base-100 pl-1 pt-1 pr-2 ${colSpan}`}>
            <figure className="p-1">
                {icon &&
                <div className="align-middle w-12 text-center pl-2 pr-2">
                    {icon}
                </div>
                }
                <h2 className="pl-4 text-lg font-bold w-full">
                    {caption}
                    <div className="text-sm font-thin">{subheader}</div>
                </h2>
                {image && 
                    <div>
                        <img className="rounded" id="company-logo" src={image} width="60" height="60"></img>
                    </div>
                }
            </figure>
            <hr className="mt-1"></hr>
            <div className="card-body items-center h-96 flex-row">
                {children}
            </div>
        </div>
    )
}

export default InfoCard