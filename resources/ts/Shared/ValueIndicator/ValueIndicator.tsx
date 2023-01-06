//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import { ArrowDnImage } from "@/Shared/Images/ArrowDnImage"
import { ArrowUpImage } from "@/Shared/Images/ArrowUpImage"

interface IValueIndicatorProps {
    children: React.ReactNode
    unit: string 
}

const ValueIndicator: React.FC<IValueIndicatorProps> = (props) => {
    let colorString = (props.children == 0 || props.children == "N/A") 
        ? "badge" 
        : props.children! > 0 ? "badge badge-success" : "badge badge-error"
    return (
        <div className={`${colorString} badge-lg gap-2 min-w-full text-slate-50 justify-between`}>
            {props.children! >= 0 ?  <ArrowUpImage /> : <ArrowDnImage />}
            <div className="inline-block ml-3">{props.children}{props.children == "N/A" ? "" : props.unit}</div>
        </div>
    )
}

export default ValueIndicator