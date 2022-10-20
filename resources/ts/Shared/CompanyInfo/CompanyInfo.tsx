//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import fetchProfile from "@/planetapi/fetch.profile"
import { IProfile } from "@/types/profile"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { useSecurity } from "../SecurityContext/SecurityContext"
import Spinner from "../Spinner"

function CompanyInfo(): JSX.Element {
    const { symbol, exchange } = useSecurity().context

    const [companyName, setCompanyName] = useState("")
    const [price, setPrice] = useState(0.0) 
    const [changes, setChanges] = useState(0.0)
    const [image, setImage] = useState("")
    const [currency, setCurrency] = useState("")

    const { isLoading, isError } = useQuery<IProfile>(
        [
            ["profile", symbol, exchange].join("-"),
            { symbol: symbol, exchange: exchange}
        ],
        fetchProfile,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
            onSuccess: (data: IProfile): void => { 
                setCompanyName(data.companyName)
                setPrice(data.price)
                setChanges(data.changes)
                setImage(data.image)
                setCurrency(data.currency)
            }
        }
    )

    const color = changes < 0 ? { color: "red" } : { color: "green" }

    function toPercentage(price: number, change: number): number {
        const oldPrice = price - change
        return (change / oldPrice) * 100
    }

    const percentageChange = toPercentage(price, changes).toPrecision(3)

    const sign = changes > 0 ? "+" : ""

    return (
        <div className={`stats shadow ${symbol ? "" : " hidden"}`}>
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring-1 ring-slate-400 ring-offset-base-100 ring-offset-4">
                            { isLoading ? <Spinner height={24} width={24}></Spinner> : <img src={image} /> }
                        </div>
                    </div>
                </div>
                <div className="stat-value">{companyName}</div>
                <div className="stat-title">{exchange.toUpperCase() + ":" + symbol.toUpperCase()}</div>
                <div className="stat-desc">{price + ` ${currency} `}<span style={color}>{sign + changes.toPrecision(3) + " USD "}({sign + percentageChange}%)</span></div>
            </div>
        </div>
    )
}

export default CompanyInfo