//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//

import React, { useEffect, useRef, useState } from "react";
import Tickerlist from "../Tickerlist";
import useFetch from "../../useFetch";
type SetEndPointFunc = (endpoint: string) => void

export function TickerSearch(props: { setEndPoint: SetEndPointFunc }) {
    const [value, setValue] = useState("")
    const tickerListRef = useRef<HTMLDataListElement>(null);
    const searchField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchField.current?.focus()
    }, [])

    function submit() {
        const val = (searchField.current?.value as string).toUpperCase()
        if (!val) {
            return
        }
        const security = tickerListRef.current?.options.namedItem(val)
        if (security?.getAttribute('data-exchange-id')) {
            props.setEndPoint("/api/security/nasdaq/" + val + "/summary")
        }
    }

    return <>
        <img src="images/banner.webp" className="rounded-lg shadow-2xl max-w-xs sm:max-w-lg" />
        <div>
            <h1 className="text-4xl font-bold text-center lg:text-left">Search for your favorite ticker here...</h1>
            <p className="hidden md:block py-6 pr-14"></p>
            <div className="form-control">
                <div className="input-group justify-center lg:justify-start">
                    <input
                        onChange={e => setValue(e.target.value)}
                        value={value} ref={searchField} 
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