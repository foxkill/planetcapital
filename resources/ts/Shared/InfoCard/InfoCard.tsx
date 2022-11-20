//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"
import { ArrowUpImage } from "../Images/ArrowUpImage"

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
        <div className={`card card-bordered bg-base-100 pl-1 pr-1 ${colSpan}`}>
            <figure className="pl-1 pr-1 pt-1">
                <div className="align-middle w-12 text-center pl-2 pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="blue" width={30} height={30}>
                        {/* Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc */}
                        <path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                    </svg>
                </div>
                <h2 className="text-lg font-bold w-full">
                    {caption}
                    <div className="text-sm font-thin">{subheader}</div>
                </h2>
                {image && 
                    <div>
                        <img id="company-logo" src={image} width="80" height="80"></img>
                    </div>
                }
            </figure>
            <hr className="mt-1"></hr>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default InfoCard