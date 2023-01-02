//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import descriptions from "@/models/descriptions.model"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import { IncomeStatementChart } from "@/Shared/Charts"
import CompanyInfo from "@/Shared/CompanyInfo"
import Description from "@/Shared/Description"
import Hero from "@/Shared/Hero"
import HugeHeader from "@/Shared/HugeHeader"
import WaterfallImage from "@/Shared/Images/WaterfallImage"
import { StatementTable } from "@/Shared/IncomeStatement"
import InfoCard from "@/Shared/InfoCard"
import Layout from "@/Shared/Layout"
import ProfitablityOverview from "@/Shared/Profitability/ProfitabilityOverview"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import Spacer from "@/Shared/Spacer"
import Spinner from "@/Shared/Spinner"
import { FinMetricKind } from "@/types/finmetrickind"
import IIncomeStatement from "@/types/income-statement"
import { Link } from "@inertiajs/inertia-react"
import React from "react"
import { usePalette } from "react-palette"
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
    if (periodType != "FY") {
        // For the TTM calculation.
        limit *= 4;
    }

    // ebit / (totalAsset - totalCurrentLiabilities)
    const imageUrl = `/api/security/${exchange}/${symbol}/image`
    const { data } = usePalette(imageUrl)

    const pastgrowth: PastGrowthMetric[] = [
        { revenue: "Revenue" },
        { netIncome: "Net Income" },
        { operatingIncome: "Operating Income" }
    ]

    const returns = [
        { returnOnEquity: "ROE" },
        { returnOnAssets:  "ROA" },
        { returnOnCapitalEmployed: "ROCE" },
    ]

    const margins = [
        { grossProfitMargin: "Gross Profit Margin" },
        { operatingProfitMargin: "Operating Margin" },
        { netProfitMargin: "Net Margin" },
    ]

    const fcfs = [
        { operatingCashFlow: "Operating Cash Flow" },
        { capitalExpenditures: "Capital Expenditures" },
        { freeCashFlow: "Free Cash Flow"},
    ]

    const incomeStatementQueryKey = ["income-statement", symbol, exchange, periodType, limit].join("-").toLocaleLowerCase()
    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [incomeStatementQueryKey, { exchange, symbol, periodType, limit }],
        fetchIncomeStatement,
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
            {/* Selection */}
            <Hero height={30}>
                <HugeHeader color="text-slate-500" bold={false} padding={0}>{companyName}</HugeHeader>
                <HugeHeader>Profitability</HugeHeader>
                <CompanyInfo />
                <SelectPeriod />
            </Hero>
            {/* Past Growth */}
            <Hero onTop height={60}>
                <HugeHeader>Past Growth</HugeHeader>
                <Description>{descriptions["PASTGROWTH"]}</Description>
                <Spacer />
                <div className="grid grid-cols-1 items-center lg:grid-cols-3 gap-4 w-full">
                    <ProfitablityOverview
                        symbol={symbol}
                        exchange={exchange}
                        periodType={periodType}
                        limit={limit}
                        companyName={companyName}
                        palette={data}
                        metrics={pastgrowth}
                        metricKind={FinMetricKind.INCOME}
                    />
                </div>
                <Spacer />
            </Hero>
            {/* Margins */}
            <Hero onTop height={60} backgroundColor="bg-base-300">
                <Spacer />
                <HugeHeader>Margins</HugeHeader>
                <Description>{descriptions["MARGINS"]}</Description>
                <Spacer />
                <div className="grid grid-cols-1 items-center lg:grid-cols-3 gap-4 w-full">
                    <ProfitablityOverview
                        symbol={symbol}
                        exchange={exchange}
                        periodType={periodType}
                        limit={limit}
                        companyName={companyName}
                        palette={data}
                        metrics={margins}
                        metricKind={FinMetricKind.NONE}
                    />
                </div>
                <Spacer />
            </Hero>
            {/* Return on Capital */}
            <Hero onTop>
                <Spacer />
                <HugeHeader>Return On Captial</HugeHeader>
                <Spacer />
                <Description>{descriptions["ROC"]}</Description>
                <Spacer />
                <div className="grid grid-cols-1 items-center lg:grid-cols-3 gap-4 w-full">
                    <ProfitablityOverview
                        symbol={symbol}
                        exchange={exchange}
                        periodType={periodType}
                        limit={limit}
                        companyName={companyName}
                        palette={data}
                        metrics={returns}
                        metricKind={FinMetricKind.NONE}
                    />
                    {incomeStatementQuery.isLoading
                        ? <Spinner></Spinner>
                        : (<InfoCard
                            stacked
                            colSpan={"col-span-1 lg:col-span-3"}
                            header={"Earnings Sankey Graph"}
                            subheader={companyName || ""}
                            image={imageUrl}
                            icon={<WaterfallImage width={30} height={30} />}>
                            {
                                incomeStatementQuery.isLoading
                                    ? (<div className="flex w-full h-96 justify-center items-center"><Spinner width={48} height={48}></Spinner></div>)
                                    : (<>
                                        <div className="w-1/2 h-96">
                                            <IncomeStatementChart palette={data} data={incomeStatementQuery.data || []} />
                                        </div>
                                        <div className="w-1/2 h-full">
                                            <StatementTable incomeStatements={incomeStatementQuery.data || []} />
                                        </div>
                                    </>
                                    )
                            }
                        </InfoCard>)
                    }
                </div>
                <Spacer />
            </Hero>
            {/* Free Cash Flow */}
            <Hero onTop backgroundColor="bg-base-300">
                <Spacer />
                <HugeHeader>Free Cash Flow</HugeHeader>
                <Spacer />
                <Description>{descriptions["FCF"]}</Description>
                <Spacer />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">

                </div>
            </Hero>
        </>
    )
}

Index.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default Index