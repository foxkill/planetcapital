//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React, { ReactNode } from "react";
import Card from "../Card";
import ISecurity from "@/types/security";

function HugeHeader({data, children}:{ data: ISecurity, children: ReactNode}) {
    return <h2 className="min-h-4 !mt-0 !mb-16 uppercase text-center text-4xl font-bold">{children} {data?.symbol ? "(" + data.symbol + ")" : ""}</h2>
}

export function Cards(props: { data: ISecurity, visible: boolean }) {
    const data = props.data || {}
    return (
        <>
            {/* Container */}
            <div className={`${props.visible ? '' : 'hidden '}` + "container bg-base-200 mx-auto pt-16 pb-20 place-self-center"}>
                {/* Huge Header */}
                <HugeHeader data={props.data}>Valuation Multiples</HugeHeader>
                {/* Grid */}
                <div className="grid grid-rows-auto grid-cols-1 lg:grid-cols-child-size-lg  md:grid-cols-child-size-md sm:grid-cols-child-size-sm justify-center place-items-center gap-8 bg-base-200 pl-14 pr-14">
                    <Card key={"pe"} 
                        ikey={"priceEarningsRatio"} 
                        data={data}>P/E</Card>
                    <Card key={"p/s"} 
                        ikey={"priceToSalesRatio"} 
                        data={data}>P/S</Card>
                    <Card key={"p/b"} 
                        ikey={"priceToBookRatio"} 
                        data={data}>P/B</Card>
                    <Card key={"p/ocf"} 
                        ikey={"priceToOperatingCashFlowsRatio"} 
                        data={data}>P/OCF</Card>
                    <Card key={"quickRatio"} 
                        ikey={"quickRatio"} 
                        data={data}>Quick Ratio</Card>
                    <Card key={"currentRatio"} 
                        ikey={"currentRatio"} 
                        data={data}>Current Ratio</Card>
                </div>
            </div>
        </>
    )
}

export default Cards