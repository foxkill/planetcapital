//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetapi
// Closed Source
//

import React, { useContext, useEffect, useRef, useState } from "react";
import Tickerlist from "../Tickerlist";
import securityContext from '../SecurityContext';
import SelectPeriod from "../SelectPeriod/SelectPeriod";

export function TickerSearch(): JSX.Element {
    const [value, setValue] = useState("")
    const tickerListRef = useRef<HTMLDataListElement>(null);
    const searchField = useRef<HTMLInputElement>(null);
    const ctx = useContext(securityContext)

    useEffect(() => {
        searchField.current?.focus()
    }, [])

    function submit() {
        const exchanges: Record<number, string> = {
            0: "",
            1: "amex",
            2: "nasdaq",
            3: "nyse",
        }

        const val = (searchField.current?.value as string).toUpperCase()

        if (!val) {
            return
        }

        const security = tickerListRef.current?.options.namedItem(val)

        const exchangeId = security?.getAttribute('data-exchange-id') || 0
        const exchange = exchanges[exchangeId]

        if (exchange) {
            const endpoint = `/api/security/${exchange}/${val.toLowerCase()}/relative-valuation/${ctx.context.periodType.toLocaleLowerCase()}`
            ctx.setContext({...ctx.context, exchange, symbol: val})
        }
    }

    return <>
        <img src="images/banner.webp" className="rounded-lg shadow-2xl max-w-xs sm:max-w-lg" />
        <div>
            <h1 className="text-4xl font-bold text-center lg:text-left">Search for your favorite ticker here...</h1>
            <p className="py-6 pr-14"></p>
            <div className="form-control">
                <div className="input-group justify-center lg:justify-start">
                    <input
                        onChange={e => setValue(e.target.value)}
                        value={value} 
                        ref={searchField}
                        type="search"
                        placeholder="Search, i. e. AAPL..."
                        className="input input-bordered w-full"
                        list="tickerlist"
                        required />
                    <button className="btn btn-square" onClick={submit}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="form-control">
                <Tickerlist ref={tickerListRef} />
            </div>
        </div>
    </>
}

export default TickerSearch