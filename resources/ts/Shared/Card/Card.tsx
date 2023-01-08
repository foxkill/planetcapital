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
import { useSecurity } from "../SecurityContext/SecurityContext";
import { Link } from "@inertiajs/inertia-react"
import IRatioTTM, { TTMRatioProperties as RatioTTMProperties } from "@/types/ratio.ttm";
import { IKeyMetric, KeyMetricProperites } from "@/types/key-metric";
import { IKeyMetricTTM } from "@/types/key-metric.ttm";

interface CardProps {
    data: IRatio | IRatioTTM | IKeyMetric | IKeyMetricTTM
    ikey: RatioProperties | RatioTTMProperties | KeyMetricProperites
    children: React.ReactNode
    width?: number
}

const Card = (props: CardProps): JSX.Element | null => {
    const { context } = useSecurity()

    if (!props.data) {
        return null
    }

    const width = props.width ? props.width : "full"

    const key = props.ikey
    let value = props.data[key]?.toFixed(2) ?? "0.00"

    const detailUrl = props.ikey.split(/(?=[A-Z])/).join("-").toLowerCase();

    return (
        <div className={`card card-bordered w-${width} h-60 bg-base-100 hover:shadow-xl group`}>
            <figure className="bg-slate-200 justify-between">
                <div className="basis-1/4">&nbsp;</div>
                <div className="basis-2/4">
                    <h2 className="text-4xl text-center bg-slate-200 pt-1 overflow-hidden">{value}</h2>
                    <p className="pb-1 text-sm text-center uppercase">{props.children}</p>
                </div>
                <div className="basis-1/4 flex flex-col items-end pr-2 opacity-0 group-hover:opacity-100">
                    <button className="btn btn-square btn-xs">
                        <Link href={`/security/${context.exchange.toLowerCase()}/${context.symbol.toLowerCase()}/relative-valuation/ratio/${detailUrl}`}>
                            <ExternalLinkImage />
                        </Link>
                    </button>
                    <div className="h-1"></div>
                    <button className="btn btn-square btn-xs">
                        <InformationImage />
                    </button>
                </div>
            </figure>
            <div className="card-body text-center">
                <table className="table table-compact w-full text-slate-600">
                    <tbody>
                        <tr className="hover">
                            <td>Median</td>
                            <td className="text-right font-bold">10.8</td>
                        </tr>
                        <tr className="hover">
                            <td>Industry</td>
                            <td className="text-right font-bold">2.4</td>
                        </tr>
                        <tr className="hover">
                            <td>Forward Multiple</td>
                            <td className="text-right font-bold">7.6</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Card