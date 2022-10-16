import useFetch from "../../useFetch"
import React, { forwardRef } from "react";
import Ticker from "@/types/ticker";
import Spinner from "../Spinner";
import IInformation from "@/types/information";

function Message(props: { info: IInformation }): JSX.Element {
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

const Tickerlist = forwardRef<HTMLDataListElement>((props, ref) => {
    const info = useFetch("http://localhost/api/tickers")

    return (
        <>
            <Message info={info}></Message>
            <datalist id="tickerlist" ref={ref}>
                {
                    info.data &&
                    (info?.data as Ticker[]).map((item: Ticker) => <option
                        key={item.id} data-value={item.name}
                        data-exchange-id={item.exchange_id}
                        name={item.tikr}>{item.tikr}</option>)
                }
            </datalist>
        </>
    );
})

export default Tickerlist;