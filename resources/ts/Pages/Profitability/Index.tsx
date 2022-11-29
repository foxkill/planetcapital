//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import fetchKeyMetrics from "@/planetapi/fetch.key-metrics"
import CompanyInfo from "@/Shared/CompanyInfo"
import Hero from "@/Shared/Hero"
import HugeHeader from "@/Shared/HugeHeader"
import InfoCard from "@/Shared/InfoCard"
import Layout from "@/Shared/Layout"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import Spinner from "@/Shared/Spinner"
import { IKeyMetric } from "@/types/key-metric"
import { Link } from "@inertiajs/inertia-react"
import React from "react"
import { useQuery } from "react-query"

interface IProfitabilityPageProps {
    symbol: string
    exchange: string
}

interface IPage<P extends IProfitabilityPageProps> extends React.FC<P> {
    layout?: (page: React.ReactNode) => JSX.Element
}
//
// Profitability Page
//
const Index: IPage<IProfitabilityPageProps> = () => {
    const { exchange, symbol, periodType, companyName } = useSecurity().context

    let limit = 10

    if (periodType === "QTR") {
        limit += 4;
    }

    const key = ["key-metrics", symbol, exchange, periodType, limit].join("-").toLocaleLowerCase()
    console.log(key);
    
    // const { data } = usePalette(`/api/security/${exchange}/${symbol}/image`)
    const keyMetricsQuery = useQuery<IKeyMetric[]>(
        [
            ["key-metrics", symbol, exchange, periodType, limit].join("-").toLowerCase(),
            { symbol, exchange, periodType, limit }
        ],
        fetchKeyMetrics,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    return (
        <>
            <Hero height={20}>
                <div className="text-sm breadcrumbs">
                    <ul>
                        {/* Goes to summary */}
                        <li><Link href="/">{symbol.toUpperCase()}</Link></li>
                        { /* Goes to parent */}
                        <li>Profitability</li>
                    </ul>
                </div>
            </Hero>
            <Hero onTop>
                <HugeHeader>Profitability</HugeHeader>
                <CompanyInfo />
                <SelectPeriod />
                {keyMetricsQuery.isLoading ? (<Spinner />) :
                    (<InfoCard
                        colSpan={"col-span-1 lg:col-span-3"}
                        header={"ROE"}
                        subheader={companyName}
                        // subheader="Tesla"
                        image={`/api/security/${exchange.toLocaleLowerCase()}/${symbol.toLowerCase()}/image`}>ROE
                    </InfoCard>)
                }
            </Hero>
        </>
    )
}

Index.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default Index