//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React from "react";
import IRatio, { RatioProperties } from "@/types/ratio";
import { ExternalLinkImage } from "../Images/ExternalLinkImage";
import { InformationImage } from "../Images/InformationImage";
import PeriodTypes from "@/types/period";
import { useSecurity } from "../SecurityContext/SecurityContext";
import { Link } from "@inertiajs/inertia-react"

interface CardProps {
    type?: PeriodTypes
    data: IRatio | undefined
    ikey: RatioProperties
    children: React.ReactNode
}
// href="https://www.alphaspread.com/security/nyse/asix/relative-valuation/ratio/price-to-sales"

const Card = (props: CardProps): JSX.Element | null => {

    const { context } = useSecurity()
    const keymap = {
        "FY": "",
        "TTM": "TTM",
        "QTR": "",
    }

    if (!props.data) {
        return null 
    }

    const key = props.ikey + keymap[props.type ?? "FY"]
    let value = props.data[key]?.toFixed(2) ?? "0.00"
 
    const detailUrl = props.ikey.split(/(?=[A-Z])/).join("-").toLowerCase();
    return (
        <div className="card card-bordered w-60 h-60 bg-base-100 hover:shadow-xl">
            <div className="bg-slate-200 relative p-2 justify-self-auto">
                <h2 className="leading-8 pt-2 text-4xl text-center">{value}</h2>
                <p className="pt-1 pb-1 text-sm text-center leading-4 uppercase">{props.children}</p>
                <button className="btn btn-square btn-xs absolute right-3 top-[15%] transform-50">
                    <Link href={`/security/${context.exchange.toLowerCase()}/${context.symbol.toLowerCase()}/relative-valuation/ratio/${detailUrl}`}>
                        <ExternalLinkImage />
                    </Link>
                </button>
                <button className="btn btn-square btn-xs absolute right-3 top-[55%] transform-50">
                    <InformationImage />
                </button>
            </div>
            <div className="card-body text-center">
                {props.data.period ?? props.type}
            </div>
        </div>
    )
}

export default Card