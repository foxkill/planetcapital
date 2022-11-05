//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetapi
// Closed Source
//
import React, { ReactNode } from "react";
import Card from "../Card";
import IRatio from "@/types/ratio";
// import valuations from "../../models/valuation.models";
import { useSecurity } from "../SecurityContext/SecurityContext";
import styles from "./Cards.styles"
import HugeHeader from "../HugeHeader/HugeHeader";
import { Valuations } from "@/models/valuation.models";
import Hero from "../Hero";
import { useQuery } from "react-query";
import fetchFinancialRatios from "@/planetapi/fetch.financialratios";
import Spinner from "../Spinner";

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
        <div className="alert alert-error shadow-lg mb-6 flex">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{msg}</span>
            </div>
        </div>
    )
}

interface ICardsProperties {
    children: React.ReactNode
    valuations: Valuations
}

export function Cards(props: ICardsProperties): JSX.Element | null {
    const context = useSecurity().context

    const ratioQuery = useQuery<IRatio>(
        [
            ["ratios", context.symbol, context.exchange, context.periodType].join("-").toLocaleLowerCase(),
            {
                symbol: context.symbol,
                exchange: context.exchange,
                periodType: context.periodType,
                limit: context.limit
            }
        ],
        fetchFinancialRatios,
        {
            enabled: Boolean(context.symbol && context.exchange),
            retry: false,
        }
    )


    // const { data, error, loading } = context.information

    return (
        <>
            <HugeHeader>{props.children}</HugeHeader>
            <Error error={ratioQuery.error}>Es konnten keine Daten für diese Aktie geladen werden</Error>
            <div className={"grid " + styles.cards}>
                {
                    ratioQuery.isLoading ? (
                        <div className="text-center w-full lg:col-span-4 md:col-span-3">
                            <Spinner height={24} width={24}></Spinner>
                        </div>
                    ) : (
                        props.valuations.map((value) => {
                            const [key, val] = Object.entries(value)[0]
                            return <Card type={context.periodType} key={key} ikey={val} data={ratioQuery.data as IRatio}>{key}</Card>
                        })
                    )
                }
            </div>
            <Hero></Hero>
        </>
    )
}

export default Cards

