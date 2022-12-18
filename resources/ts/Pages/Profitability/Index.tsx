//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import descriptions from "@/models/descriptions.model"
import CompanyInfo from "@/Shared/CompanyInfo"
import Description from "@/Shared/Description"
import Hero from "@/Shared/Hero"
import HugeHeader from "@/Shared/HugeHeader"
import Layout from "@/Shared/Layout"
import ProfitablityOverview from "@/Shared/Profitability/ProfitabilityOverview"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import { Link } from "@inertiajs/inertia-react"
import React from "react"
import { usePalette } from "react-palette"

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
const Index: IPage<IProfitabilityPageProps> = (props) => {
    const ctx = useSecurity()
    let { exchange, symbol, periodType, companyName } = ctx.context

    if (!symbol) {
        // eslint-disable-next-line react/prop-types
        symbol = props.symbol
    }

    if (!exchange) {
        // eslint-disable-next-line react/prop-types
        exchange = props.exchange
    }

    let limit = 11
    if (periodType === "QTR") {
        // For the TTM calculation.
        limit += 4;
    }

    // ebit / (totalAsset - totalCurrentLiabilities)
    const { data } = usePalette(`/api/security/${exchange}/${symbol}/image`)
    const pastgrowth = [
        { metric: "Revenue", metricKey: "revenue" },
        { metric: "Operating Income", metricKey: "operatingIncome" },
        { metric: "Net Income", metricKey: "netIncome" },
    ]

    const returns = [
        { metric: "ROE", metricKey: "returnOnEquity" },
        { metric: "ROA", metricKey: "returnOnAssets" },
        { metric: "ROCE", metricKey: "returnOnCapitalEmployed" },
    ]

    const margins = [
        { metric: "Gross Profit Margin", metricKey: "grossProfitMargin" },
        { metric: "Operating Margin", metricKey: "operatingProfitMargin" },
        { metric: "Net Margin", metricKey: "netProfitMargin" }
    ]

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
            <Hero height={30}>
                <HugeHeader color="text-slate-500" bold={false} padding={0}>{companyName}</HugeHeader>
                <HugeHeader>Profitability</HugeHeader>
                <CompanyInfo />
                <SelectPeriod />
            </Hero>
            <Hero onTop height={60}>
                <HugeHeader>Past Growth</HugeHeader>
                <Description>{descriptions["PASTGROWTH"]}</Description>
                <div className="h-6"></div>
                <div className="grid grid-cols-1 items-center lg:grid-cols-3 gap-4 w-full">
                    <ProfitablityOverview
                        symbol={symbol}
                        exchange={exchange}
                        periodType={periodType}
                        limit={limit}
                        companyName={companyName}
                        palette={data}
                        metrics={pastgrowth}
                        metricKind={"INCOME"}
                    />
                </div>
            </Hero>
            <Hero onTop height={60}>
                <HugeHeader>Margins</HugeHeader>
                <Description>{descriptions["MARGINS"]}</Description>
                <div className="h-6"></div>
                <div className="grid grid-cols-1 items-center lg:grid-cols-3 gap-4 w-full">
                    <ProfitablityOverview
                        symbol={symbol}
                        exchange={exchange}
                        periodType={periodType}
                        limit={limit}
                        companyName={companyName}
                        palette={data}
                        metrics={margins}
                        metricKind={""}
                    />
                </div>
            </Hero>
            <Hero onTop>
                <HugeHeader>Return On Captial</HugeHeader>
                <Description>{descriptions["ROC"]}</Description>
                <div className="h-6"></div>
                <div className="grid grid-cols-1 items-center lg:grid-cols-3 gap-4 w-full">
                    <ProfitablityOverview
                        symbol={symbol}
                        exchange={exchange}
                        periodType={periodType}
                        limit={limit}
                        companyName={companyName}
                        palette={data}
                        metrics={returns}
                        metricKind={""}
                    />
                </div>
            </Hero>
        </>
    )
}

Index.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default Index