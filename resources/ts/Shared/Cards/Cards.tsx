//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React, { ReactNode, useContext } from "react";
import Card from "../Card";
import ISecurity, { SecurityProperties } from "@/types/security";
import securityContext from "../SecurityContext";

function HugeHeader({ data, children }: { data: ISecurity, children: ReactNode }) {
    return <h2 className="min-h-4 !mt-0 !mb-16 uppercase text-center text-4xl font-bold">{children} {data?.symbol ? "(" + data.symbol + ")" : ""}</h2>
}

function Error({ error, children }: { error: any, children: ReactNode }) {
    if (!error) {
        return null
    }

    let msg = children

    if (error.response) {
        try {
            console.log(error.response.data);

            msg = JSON.parse(error.response.data.message)
        } catch (error) {
        }
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        //  console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        if (!msg) {
            msg = error.message
        }
        // console.log('Error', error.message);
    }
    return (
        <div className="alert alert-error shadow-lg w-80 mx-auto mb-6">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{msg}</span>
            </div>
        </div>
    )
}


export function Cards(props: { data: ISecurity, visible: boolean }): JSX.Element {
    const context = useContext(securityContext)

    const data = context.data as ISecurity
    const type = context.endpointType

    const valuations: Record<string, SecurityProperties>[] = [
        { 'p/e': 'priceEarningsRatio' },
        { 'peg': 'priceEarningsToGrowthRatio' },
        { 'p/s': 'priceSalesRatio' },
        { 'p/b': 'priceToBookRatio' },
        { 'p/b': 'priceToBookRatio' },
        { 'p/fcf': 'priceToFreeCashFlowsRatio'},
        { 'p/ocf': 'priceToOperatingCashFlowsRatio'},
        { 'p/fcf': 'priceToFreeCashFlowsRatio'},
        { 'cash_ratio': 'cashRatio'}
    ]

    return (
        <>
            <Error error={context.error}>Es konnten keine Daten für diese Aktie geladen werden</Error>
            {/* Container */}
            <div className={`${props.visible ? '' : 'hidden '}` + "container bg-base-200 mx-auto pt-4 pb-20 place-self-center"}>
                {/* Huge Header */}
                <HugeHeader data={props.data}>Valuation Multiples</HugeHeader>
                {/* Grid */}
                <div className="grid grid-rows-auto grid-cols-1 lg:grid-cols-child-size-lg  md:grid-cols-child-size-md sm:grid-cols-child-size-sm justify-center place-items-center gap-8 bg-base-200 pl-14 pr-14">
                    <Card key={"pe"}
                        ikey={"priceEarningsRatio"}
                        data={data}
                        type={type}>P/E</Card>
                    <Card key={"peg"}
                        ikey={"priceEarningsToGrowthRatio"}
                        data={data}
                        type={type}>PEG</Card>
                    <Card key={"p/s"}
                        ikey={"priceToSalesRatio"}
                        data={data}
                        type={type}>P/S</Card>
                    <Card key={"p/b"}
                        ikey={"priceToBookRatio"}
                        data={data}
                        type={type}>P/B</Card>
                    <Card key={"P/FCF"}
                        ikey={"priceToFreeCashFlowsRatio"}
                        data={data}
                        type={type}>P/FCF</Card>
                    <Card key={"p/ocf"}
                        ikey={"priceToOperatingCashFlowsRatio"}
                        data={data}
                        type={type}>P/OCF</Card>
                    <Card key={"cashRatio"}
                        ikey={"cashRatio"}
                        data={data}
                        type={type}>Cash Ratio</Card>
                    <Card key={"quickRatio"}
                        ikey={"quickRatio"}
                        data={data}
                        type={type}>Quick Ratio</Card>
                </div>
            </div>
        </>
    )
}

export default Cards