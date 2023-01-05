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
    const imageUrl = `/api/security/${exchange}/${symbol}/image`

    const { data } = usePalette(imageUrl)

    let limit = 10

    if (period != "FY") {
        limit = 40
    }

    const profileQueryKey = ["profile", symbol, exchange, period].join("-").toLocaleLowerCase()
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

    const incomeStatementQueryKey = ["income-statement", symbol, exchange, period, limit].join("-").toLocaleLowerCase()
    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [incomeStatementQueryKey, { exchange, symbol, periodType: period, limit }],
        fetchIncomeStatement,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    const statements: Record<string, { caption: string }>[] = [
        { revenue: { caption: "Revenue" } },
        { grossProfit: { caption: "Gross Profit" } },
        { operatingIncome: { caption: "Operating Income" } },
        { netIncome: { caption: "Net Income" } },
    ]

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
            <Hero onTop>
                <HugeHeader color="text-slate-500" bold={false} padding={0}>{profileQuery.data?.companyName}</HugeHeader>
                <HugeHeader>Income Statement</HugeHeader>
                <SelectPeriod></SelectPeriod>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                    {statements.map((value, index) => {
                        const entries = Object.entries(value)
                        const caption = entries[0][1].caption
                        const key = entries[0][0]
                        const lineitem = caption.toLocaleLowerCase().split(/\s+/).join("-")
                        return (
                            <>
                                <Link href={route("security.financials.incomestatement.lineitem", { symbol, exchange, lineitem })}>
                                    <StatementCard
                                        key={index}
                                        caption={caption}
                                        palette={data}
                                        data={incomeStatementQuery.data!}
                                        isLoading={incomeStatementQuery.isLoading}
                                        periodType={periodType}
                                        dataKey={key}>
                                        <Spinner width={24} height={24}></Spinner>
                                    </StatementCard>
                                </Link>
                            </>
                        )
                    })
                    }
                </div>
                <div className="grid grid-cols-1 gap-8 w-full h-full">
                    <InfoCard
                        stacked
                        colSpan={"col-span-1 lg:col-span-3"}
                        header={"Earnings Sankey Graph"}
                        subheader={profileQuery.data?.companyName || ""}
                        image={imageUrl}
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