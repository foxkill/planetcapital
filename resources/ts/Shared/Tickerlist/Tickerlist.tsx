import useFetch from "../../useFetch"
import React, { forwardRef, useEffect, useState } from "react";
import { Ticker } from "@/types/app";

const Tickerlist = forwardRef<HTMLDataListElement>((props, ref) => {
    const info = useFetch("http://localhost/api/tickers")

    if (info?.loading) {
        return (
            <label className="label">
                <span className="label-text-alt">Es lädt...</span>
            </label>
        )
    }

    if (info?.err) {
        return (
            <label className="label">
                <span className="label-text-alt text-red-600">Es ist ein Fehler aufgetreten</span>
            </label>
        )
    }

    if (!info?.data) {
        return (
            <label className="label">
                <span className="label-text-alt text-red-600">Es konnten keine Daten geladen werden</span>
            </label>
        )
    }

    const options = info.data.map((item: Ticker) => <option className="!bg-white" 
        key={item.id} data-value={item.name} 
        data-exchange-id={item.exchange_id} 
        name={item.tikr}>{item.tikr}</option>)

    return (
        <datalist className="!bg-white rounded" id="tickerlist" ref={ref}>
            {options}
        </datalist>
    );
})

export default Tickerlist;