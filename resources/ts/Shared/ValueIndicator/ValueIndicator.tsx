//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import { ArrowDnImage } from "../Images/ArrowDnImage"
import { ArrowUpImage } from "../Images/ArrowUpImage"

interface IValueIndicatorProps {
    children: React.ReactNode
    unit: string 
}

const ValueIndicator: React.FC<IValueIndicatorProps> = (props) => {
    return (
        <div className={`badge ${props.children! > 0 ? "badge-success" : "badge-error"} badge-lg gap-2 min-w-full text-slate-50 justify-between`}>
            {props.children! >= 0 ?  <ArrowUpImage /> : <ArrowDnImage />}
            <div className="inline-block ml-3">{props.children}{props.unit}</div>
        </div>
    )
}

export default ValueIndicator