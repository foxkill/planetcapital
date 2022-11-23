//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { useState } from "react"
import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"
import Spinner from "@/Shared/Spinner"
import { useQuery } from "react-query"
import InfoCard from "@/Shared/InfoCard"
import { usePalette } from "react-palette"
import { IProfile } from "@/types/profile"
import HugeHeader from "@/Shared/HugeHeader"
import { Link } from "@inertiajs/inertia-react"
import StatementCard from "@/Shared/StatementCard"
import fetchProfile from "@/planetapi/fetch.profile"
import { IncomeStatementChart } from "@/Shared/Charts"
import IIncomeStatement from "@/types/income-statement"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import WaterfallImage from "@/Shared/Images/WaterfallImage"
import { StatementTable } from "@/Shared/IncomeStatement"

interface IIncomeStatementProps {
    symbol: string
    exchange: string
}

const Index: React.FC<IIncomeStatementProps> = (props) => {
    const { exchange, symbol } = props
    const [color, setColor] = useState("#fff")

    const limit = 4
    const period = "FY"

    const { data, loading, error } = usePalette(`/api/security/${exchange}/${symbol}/image`)

    const profileQuery = useQuery<IProfile>(
        [
            ["profile", symbol, exchange].join("-"),
            { symbol, exchange }
        ],
        fetchProfile,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
            onSuccess() {
                // const img = new Image();
                // img.crossOrigin = "Anonymous"
                // // img.setAttribute("crossOrigin", "Anonymous")
                // img.setAttribute("alt", "Company Logo")
                // img.addEventListener("load", function() {
                //     const vibrant = new Vibrant(img)
                //     vibrant.getPalette().then((p:any) => {
                //         setColor(p.Vibrant.getHex())
                //     });
                // })
                // img.src = `/api/security/${exchange}/${symbol}/image`
            }
        }
    )

    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [[symbol, exchange, period, limit].join("-"), { exchange, symbol, period, limit }],
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
                        <li><Link href={route("security.financials.incomestatement", {exchange, symbol })}>Financials</Link></li>
                        <li>Income Statement</li>
                    </ul>
                </div>
            </Hero>
            <Hero>
                <HugeHeader>Income Statement</HugeHeader>
                {
                    incomeStatementQuery.isLoading ? (
                        <div className="text-center w-full lg:col-span-4 md:col-span-3">
                            <Spinner height={24} width={24}></Spinner>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                                <StatementCard caption={"Revenue"} data={incomeStatementQuery.data!}>revenue</StatementCard>
                                <StatementCard caption={"Gross Profit"} data={incomeStatementQuery.data!}>grossProfit</StatementCard>
                                <StatementCard caption={"Operating Income"} data={incomeStatementQuery.data!}>operatingIncome</StatementCard>
                                <StatementCard caption={"Net Income"} data={incomeStatementQuery.data!}>netIncome</StatementCard>
                            </div>
                            <div className="grid grid-cols-1 gap-8 w-full h-[36rem]">
                                {
                                    !incomeStatementQuery.isError && incomeStatementQuery.data &&
                                    <InfoCard
                                        colSpan={"col-span-1 lg:col-span-3"}
                                        caption={"Earnings Sankey Graph"}
                                        subheader={profileQuery.data?.companyName || ""}
                                        image={profileQuery.data?.image || undefined}
                                        icon={<WaterfallImage width={30} height={30} />}>
                                        <IncomeStatementChart primaryColor={data.vibrant ?? "#00f"} data={incomeStatementQuery.data} />
                                        <StatementTable incomeStatements={incomeStatementQuery.data} />
                                    </InfoCard>
                                }
                            </div>
                        </>
                    )
                }
            </Hero>
        </Layout>
    )
}

export default Index