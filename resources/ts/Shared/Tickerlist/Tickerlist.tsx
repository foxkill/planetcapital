import useFetch from "../../useFetch"
import React, { forwardRef } from "react";
import Ticker from "@/types/ticker";
import Spinner from "../Spinner";
import IInformation from "@/types/information";

type DatalistProperties = JSX.IntrinsicElements["datalist"];

function Message<T>(props: { info: IInformation<T> }): JSX.Element {
    const { info } = props

    if (info?.loading) {
        return (
            <>
                <label className="label">
                    <Spinner width={5} height={5}>
                        <span className="label-text-alt">Ticker werden geladen</span>
                    </Spinner>
                </label>
            </>
        )
    }

    if (info?.error) {
        return (
            <label className="label">
                <span className="label-text-alt text-red-600">Es ist ein Fehler aufgetreten.</span>
            </label>
        )
    }

    if (!info.data) {
        return (
            <label className="label">
                <span className="label-text-alt text-red-600">Es konnten keine Daten geladen werden.</span>
            </label>
        )
    }

    return <label className="label">
        <span className="label-text-alt"></span>
    </label>
}

const Tickerlist = forwardRef<HTMLDataListElement, DatalistProperties>((props, ref) => {
    const info = useFetch<Ticker[]>("http://localhost/api/tickers")
    // 
    // We need a ref because this datalist must later accessible for 
    // being queried
    // 
    return (
        <>
            <Message info={info}></Message>
            <datalist id="tickerlist" ref={ref}>
                {
                    info.data &&
                    (info.data as Ticker[]).map((item: Ticker) => <option
                        key={item.id} data-value={item.name}
                        data-exchange-id={item.exchange_id}
                        name={item.tikr}>{item.tikr}</option>)
                }
            </datalist>
        </>
    );
})

Tickerlist.displayName = "TickerList"

export default Tickerlist;