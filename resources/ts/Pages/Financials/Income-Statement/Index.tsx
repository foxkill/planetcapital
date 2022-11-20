//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"
import HugeHeader from "@/Shared/HugeHeader"
import { Link } from "@inertiajs/inertia-react"
import StatementCard from "@/Shared/StatementCard"
import InfoCard from "@/Shared/InfoCard"
import { IncomeStatementChart } from "@/Shared/Charts"
import { useQuery } from "react-query"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import IIncomeStatement from "@/types/income-statement"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"

interface IIncomeStatementProps {
    symbol: string
    exchange: string
}

const Index: React.FC<IIncomeStatementProps> = (props) => {
    const { exchange, symbol } = props
    const { companyName } = useSecurity().context

    const limit = 4
    const period = "TTM"

    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [[symbol, exchange, period, limit].join("-"), {exchange, symbol, period, limit}],
        fetchIncomeStatement as any,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    return (
        <Layout>
            <Hero height={20}>
                <div className="text-sm breadcrumbs">
                    <ul>
                        {/* Goes to summary */}
                        <li><a>{symbol.toUpperCase()}</a></li>
                        { /* Goes to parent */}
                        <li><Link href={`/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/financials`}>Financials</Link></li>
                        <li>Income Statement</li>
                    </ul>
                </div>
            </Hero>
            <Hero>
                <HugeHeader>Income Statement</HugeHeader>
                {incomeStatementQuery.data && 
                (<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                    <StatementCard caption={"Revenue"} data={incomeStatementQuery.data}>revenue</StatementCard>
                    <StatementCard caption={"Gross Profit"} data={incomeStatementQuery.data}>grossProfit</StatementCard>
                    <StatementCard caption={"Operating Income"} data={incomeStatementQuery.data}>operatingIncome</StatementCard>
                    <StatementCard caption={"Net Income"} data={incomeStatementQuery.data}>netIncome</StatementCard>
                </div>)
                }
                <div className="grid grid-cols-1 gap-8 w-full h-[32rem]">
                    {!incomeStatementQuery.isError && incomeStatementQuery.data &&
                    <InfoCard colSpan={"col-span-1 lg:col-span-3"} caption={"Earnings Waterfall"} ratio={companyName}>
                        <IncomeStatementChart data={incomeStatementQuery.data}></IncomeStatementChart>
                    </InfoCard>
                    }
                </div>
            </Hero>
        </Layout>
    )
}

export default Index