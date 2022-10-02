import useFetch from "../../useFetch"
import React, { useEffect, useState } from "react";
import Info from "../Info";
import { Ticker } from "@/types/app";

function Tickerlist() {
    // const [info, setInfo] = useState<Information>(useFetch("http://localhost/api/tickers"))
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

    const options = info.data.map((item: Ticker) => <option key={item.id}>{item.tikr}</option>)

    return (
        <>
            <datalist id="tickerlist">
                {options}
            </datalist>
        </>
    );
}

export default Tickerlist;