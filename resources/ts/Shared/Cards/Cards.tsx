//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetapi
// Closed Source
//
import React from "react";
import Card from "../Card";
import IRatio from "@/types/ratio";
import { useSecurity } from "../SecurityContext/SecurityContext";
import styles from "./Cards.styles"
import { Valuations } from "@/models/valuation.models";
import Hero from "../Hero";
import { useQuery } from "react-query";
import fetchFinancialRatios from "@/planetapi/fetch.financialratios";
import Spinner from "../Spinner";
import Error from "@/Shared/Error"
import getQueryKey from "@/utils/querykey";
import HugeHeader from "../HugeHeader";
import Spacer from "../Spacer";

interface ICardsProperties {
    children: React.ReactNode
    valuations: Valuations
    enterpriseValuations: any[]
}

export function Cards(props: ICardsProperties): JSX.Element | null {
    const context = useSecurity().context
    const limit = 1

    const ratioQuery = useQuery<IRatio>(
        [
            getQueryKey("ratios", limit, context),
            {
                symbol: context.symbol,
                exchange: context.exchange,
                periodType: context.periodType,
                limit: limit
            }
        ],
        fetchFinancialRatios,
        {
            enabled: Boolean(context.symbol && context.exchange),
            retry: false,
        }
    )

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
                            const data = ratioQuery.data ? ratioQuery.data[0] : []
                            return <Card type={context.periodType} key={key} ikey={val} data={data as IRatio}>{key}</Card>
                        })
                    )
                }
            </div>
            <Spacer />
        </>
    )
}

export default Cards

