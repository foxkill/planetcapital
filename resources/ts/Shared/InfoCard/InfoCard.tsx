//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"

interface InfoCardProperties {
    children: React.ReactNode
    colSpan?: string
    header: string
    subheader: string
    icon?: React.ReactNode
    image?: string | undefined
}

function InfoCard({ children, colSpan, header: caption, subheader, icon, image }: InfoCardProperties): JSX.Element {
    const cs = colSpan ?? ""
    return (
        <div className={`card card-bordered bg-base-100 pt-2 pr-2 ${cs}`}>
            <figure className="">
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
                        <img className="" id="company-logo" src={image} width="32" height="32"></img>
                    </div>
                }
            </figure>
            <hr className="mt-1"></hr>
            <div className="card-body items-center">
                {children}
            </div>
        </div>
    )
}

export default InfoCard