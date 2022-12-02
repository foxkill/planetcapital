//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import fetchProfile from "@/planetapi/fetch.profile"
import { IProfile } from "@/types/profile"
import toPercentage from "@/utils/percentage"
import React, { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useSecurity } from "../SecurityContext/SecurityContext"
import Spinner from "../Spinner"

type CompanyInfoProps = {
    fractionDigits?: number
}

function CompanyInfo(props: CompanyInfoProps): JSX.Element {
    const ctx = useSecurity()
    const { symbol, exchange } = ctx.context
    let fractionDigits = props.fractionDigits ?? 2

    const [companyName, setCompanyName] = useState("")
    const [price, setPrice] = useState(0.0)
    const [changes, setChanges] = useState(0.0)
    const [image, setImage] = useState("")
    const [currency, setCurrency] = useState("")

    const { isLoading } = useQuery<IProfile>(
        [
            ["profile", symbol, exchange].join("-"),
            { symbol: symbol, exchange: exchange }
        ],
        fetchProfile,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
            onSuccess: (data: IProfile): void => {
                setCompanyName(data.companyName)
                setPrice(data.price)
                setChanges(data.changes)
                setImage(`/api/security/${data.exchangeShortName.toLowerCase()}/${data.symbol.toLowerCase()}/image`)
                setCurrency(data.currency)

                ctx.context.companyName = data.companyName
            }
        }
    )

    const color = changes < 0 ? "text-ics-red" : "text-ics-green"

    const percentageChange = useMemo(() => {
        const pct = toPercentage(price, changes)
        if (Math.abs(pct) < 0.10) {
            fractionDigits = Math.max(1, fractionDigits - 1)
        }
        return pct.toPrecision(fractionDigits)
    }, [changes])

    const sign = changes > 0 ? "+" : ""
    return (
        <div className={`stats shadow ${symbol ? "" : " hidden"}`}>
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring-1 ring-slate-400 ring-offset-base-100 ring-offset-4">
                            {isLoading ? <Spinner height={24} width={24}></Spinner> : <img style={{ objectFit: "contain" }} src={image} width="64" height="64" />}
                        </div>
                    </div>
                </div>
                <div className="stat-value">{companyName}</div>
                <div className="stat-title">{exchange.toUpperCase() + ":" + symbol.toUpperCase()}</div>
                <div className="stat-desc">{price + ` ${currency} `}
                    <span className={color}>{sign + changes.toPrecision(fractionDigits) + " " + currency + " "}({sign + percentageChange}%)</span>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfo