//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"
import Spinner from "@/Shared/Spinner"
import { useQuery } from "react-query"
import InfoCard from "@/Shared/InfoCard"
import { usePalette } from "react-palette"
import { IProfile } from "@/types/profile"
import HugeHeader from "@/Shared/HugeHeader"
import { Link } from "@inertiajs/inertia-react"
import { StatementCard } from "@/Shared/StatementCard"
import fetchProfile from "@/planetapi/fetch.profile"
import { IncomeStatementChart } from "@/Shared/Charts"
import IIncomeStatement from "@/types/income-statement"
import { StatementTable } from "@/Shared/IncomeStatement"
import WaterfallImage from "@/Shared/Images/WaterfallImage"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"

interface IIncomeStatementProps {
    symbol: string
    exchange: string
}

//
// Income Statement Page
//
const Index: React.FC<IIncomeStatementProps> = () => {
    const { exchange, symbol, periodType } = useSecurity().context

    const period = periodType.toLocaleLowerCase()

    const { data } = usePalette(`/api/security/${exchange}/${symbol}/image`)

    let limit = 10

    if (period === "QTR") {
        limit *= 2
    }

    const profileQueryKey = ["profile", symbol, exchange].join("-").toLocaleLowerCase()
    const profileQuery = useQuery<IProfile>(
        [
            profileQueryKey,
            { symbol, exchange }
        ],
        fetchProfile,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    const incomeStatementQueryKey = [symbol, exchange, period, limit].join("-").toLocaleLowerCase()
    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [incomeStatementQueryKey, { exchange, symbol, periodType: period, limit }],
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
                        <li><Link href="/">{symbol.toUpperCase()}</Link></li>
                        { /* Goes to parent */}
                        {/* <li><Link href={route("security.financials.incomestatement", { exchange, symbol })}>Financials</Link></li> */}
                        <li>Income Statement</li>
                    </ul>
                </div>
            </Hero>
            <Hero>
                <HugeHeader color="text-slate-500" bold={false} padding={0}>{profileQuery.data?.companyName}</HugeHeader>
                <HugeHeader>Income Statement</HugeHeader>
                <SelectPeriod></SelectPeriod>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                    <StatementCard
                        caption={"Revenue"}
                        data={incomeStatementQuery.data!}
                        isLoading={incomeStatementQuery.isLoading}
                        dataKey="revenue">
                        <Spinner width={24} height={24}></Spinner>
                    </StatementCard>
                    <StatementCard
                        caption={"Gross Profit"}
                        data={incomeStatementQuery.data!}
                        isLoading={incomeStatementQuery.isLoading}
                        dataKey={"grossProfit"}>
                        <Spinner></Spinner>
                    </StatementCard>
                    <StatementCard
                        caption={"Operating Income"}
                        data={incomeStatementQuery.data!}
                        isLoading={incomeStatementQuery.isLoading}
                        dataKey={"operatingIncome"}>
                        <Spinner></Spinner>
                    </StatementCard>
                    <StatementCard
                        caption={"Net Income"}
                        data={incomeStatementQuery.data!}
                        isLoading={incomeStatementQuery.isLoading}
                        dataKey={"netIncome"}>
                        <Spinner></Spinner>
                    </StatementCard>
                </div>
                <div className="grid grid-cols-1 gap-8 w-full h-full">
                    <InfoCard
                        stacked
                        colSpan={"col-span-1 lg:col-span-3"}
                        header={"Earnings Sankey Graph"}
                        subheader={profileQuery.data?.companyName || ""}
                        image={`/api/security/${profileQuery.data?.exchangeShortName.toLowerCase()}/${profileQuery.data?.symbol.toLowerCase()}/image`}
                        icon={<WaterfallImage width={30} height={30} />}>
                        {
                            incomeStatementQuery.isLoading
                                ? (<div className="flex w-full h-96 justify-center items-center"><Spinner width={48} height={48}></Spinner></div>)
                                : (<>
                                    <div className="w-1/2 h-full">
                                        <IncomeStatementChart palette={data} data={incomeStatementQuery.data || []} />
                                    </div>
                                    <div className="w-1/2 h-full">
                                        <StatementTable incomeStatements={incomeStatementQuery.data || []} />
                                    </div></>
                                )
                        }
                    </InfoCard>
                </div>
            </Hero>
        </Layout>
    )
}

export default Index