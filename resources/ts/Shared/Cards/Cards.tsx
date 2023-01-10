//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetapi
// Closed Source
//
import { EnterpriseRecord, EnterpriseRecordTTM, RatioRecord, RatioTTMRecord } from "@/models/valuation.models";
import fetchAnalystEstimates from "@/planetapi/fetch.analyst-estimates";
import fetchFinancialRatios from "@/planetapi/fetch.financialratios";
import fetchKeyMetrics from "@/planetapi/fetch.key-metrics";
import Card from "@/Shared/Card";
import Error from "@/Shared/Error";
import HugeHeader from "@/Shared/HugeHeader";
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext";
import Spacer from "@/Shared/Spacer";
import Spinner from "@/Shared/Spinner";
import IAnalystEstimate from "@/types/analyst-estimates";
import { IKeyMetric, KeyMetricProperites } from "@/types/key-metric";
import { IKeyMetricTTM } from "@/types/key-metric.ttm";
import IRatio from "@/types/ratio";
import IRatioTTM from "@/types/ratio.ttm";
import { ISecurityContext } from "@/types/security.context";
import getQueryKey from "@/utils/querykey";
import React from "react";
import { useQuery } from "react-query";
import styles from "./Cards.styles";

interface ICardsProperties {
    children: React.ReactNode
    valuations: RatioRecord[] | RatioTTMRecord[]
    enterpriseValuations: EnterpriseRecord[] | EnterpriseRecordTTM[]
}

export function Cards(props: ICardsProperties): JSX.Element | null {
    const context = useSecurity().context
    const limit = 1

    const ratioQuery = useQuery<IRatio | IRatioTTM>(
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
        }
    )

    const keyMetricsQuery = useQuery<IKeyMetric[] | IKeyMetricTTM[]>(
        [
            getQueryKey("key-metrics", limit, context),
            {
                symbol: context.symbol,
                exchange: context.exchange,
                periodType: context.periodType,
                limit: limit
            }
        ],
        fetchKeyMetrics,
        {
            enabled: Boolean(context.symbol && context.exchange),
        }
    )

    const analystEstimatesQuery = useQuery<IAnalystEstimate[]>(
        [
            getQueryKey("analyst-estimates", limit, context),
            {
                symbol: context.symbol,
                exchange: context.exchange,
                periodType: context.periodType,
                limit: limit
            }
        ],
        fetchAnalystEstimates,
        {
            enabled: Boolean(context.symbol && context.exchange),
        }
    )

    console.log(analystEstimatesQuery.data);
    
    return (
        <>
            <HugeHeader>{props.children}</HugeHeader>
            <Error error={ratioQuery.error}>Es konnten keine Daten für diese Aktie geladen werden</Error>
            <div className={"grid " + styles.cards}>
                {
                    ratioQuery.isLoading || keyMetricsQuery.isLoading ? (
                        <div className="text-center w-full lg:col-span-4 md:col-span-3">
                            <Spinner height={24} width={24}></Spinner>
                        </div>
                    ) : (
                        props.valuations.map((value: RatioRecord | RatioTTMRecord) => {
                            const [key, val] = Object.entries(value)[0]
                            const data = ratioQuery.data ? ratioQuery.data[0] : []
                            return <Card key={key} ikey={val} data={data}>{key}</Card>
                        }).concat(
                            props.enterpriseValuations.map((value: EnterpriseRecord | EnterpriseRecordTTM) => {
                                const [key, val] = Object.entries(value)[0]
                                const data = keyMetricsQuery.data ? keyMetricsQuery.data[0] : [] as unknown as IKeyMetric
                                if (typeof val === "string" && val != "-") {
                                    return <Card key={key} ikey={val as KeyMetricProperites} data={data}>{key}</Card>
                                } else {
                                    return <></>
                                }
                            })
                        )
                    )
                }
            </div>
            <Spacer />
        </>
    )
}

export default Cards

