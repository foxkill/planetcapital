//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetapi
// Closed Source
//
import React, { ReactNode } from "react";
import Card from "../Card";
import IRatio from "@/types/ratio";
import valuations from "../../models/valuation.models";
import { useSecurity } from "../SecurityContext/SecurityContext";
import Spinner from "../Spinner";
import SelectPeriod from "../SelectPeriod/SelectPeriod";

function HugeHeader({ children }: { children: ReactNode }): JSX.Element {
    return <h2 className="min-h-4 !mt-0 !mb-16 uppercase text-center text-4xl font-bold">{children}</h2>
}

function Error({ error, children }: { error: any, children: ReactNode }): JSX.Element | null {
    let msg = children

    if (!error) {
        return null
    }

    if (error.response) {
        try {
            // console.log(error.response.data);
            msg = JSON.parse(error.response.data.message)
        } catch (error) {
            // do nothing
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
        // console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        if (!msg) {
            msg = error.message
        }
        // console.log('Error', error.message);
    }
    return (
        <div className="alert alert-error shadow-lg mb-6">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{msg}</span>
            </div>
        </div>
    )
}

export function Cards(): JSX.Element | null {
    const ctx = useSecurity()

    if (!ctx.context) {
        return null
    }

    const { data, error, loading } = ctx.context.information
    const visible = !!data

    return (
        <>
            {/* Container */}
            <div className={`${visible ? '' : 'hidden '}` + "container bg-base-200 mx-auto pt-4 pb-20 place-self-center"}>
                {/* Huge Header */}
                <HugeHeader>Valuation Multiples</HugeHeader>
                <SelectPeriod></SelectPeriod>
                {/* Grid */}
                <div className="grid grid-rows-auto grid-cols-1 lg:grid-cols-child-size-lg  md:grid-cols-child-size-md sm:grid-cols-child-size-sm justify-center place-items-center gap-8 bg-base-200 pl-14 pr-14">
                    {/* Loading Spinner */}
                    {
                        loading &&
                        (
                            <div className="hero bg-base-20 min-h-[60vh]">
                                <div className="hero-content flex flex-col">
                                    <div className="w-20">
                                        <Spinner></Spinner>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        (!loading && !error) &&
                        valuations.map((value) => {
                            const [key, val] = Object.entries(value)[0]
                            return <Card type={ctx.context.periodType} key={key} ikey={val} data={data as IRatio}>{key}</Card>
                        })
                    }
                    <Error error={error}>Es konnten keine Daten für diese Aktie geladen werden</Error>
                </div>
            </div>
        </>
    )
}

export default Cards

