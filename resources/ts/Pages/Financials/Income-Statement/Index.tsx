//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { useEffect, useState } from "react"
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
import { IProfile } from "@/types/profile"
import fetchProfile from "@/planetapi/fetch.profile"
import Vibrant from "node-vibrant/dist/vibrant"

interface IIncomeStatementProps {
    symbol: string
    exchange: string
}

const Index: React.FC<IIncomeStatementProps> = (props) => {
    const { exchange, symbol } = props
    const { companyName } = useSecurity().context
    const [color, setColor] = useState("#fff")

    const limit = 4
    const period = "TTM"

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
                const img = new Image();
                img.crossOrigin = "Anonymous"
                // img.setAttribute("crossOrigin", "Anonymous")
                img.setAttribute("alt", "Company Logo")
                img.addEventListener("load", function() {
                    const vibrant = new Vibrant(img)
                    vibrant.getPalette().then((p:any) => {
                        setColor(p.Vibrant.getHex())
                    });
                })
                img.src = `/api/security/${exchange}/${symbol}/image`
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

    useEffect(() => {
        // console.log("im mounted");
        // if (!profileQuery.data) {
        //     return;
        // }

        // const img = new Image();
        // img.crossOrigin = "Anonymous"
        // img.src = profileQuery.data.image

        // Vibrant.from(img).getPalette().then((p) => console.log(p))
    }, [])

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
                        <InfoCard
                            colSpan={"col-span-1 lg:col-span-3"}
                            caption={"Earnings Sankey Graph"}
                            subheader={profileQuery.data?.companyName || ""}
                            image={profileQuery.data?.image || undefined}>
                            <IncomeStatementChart primaryColor={color} data={incomeStatementQuery.data}></IncomeStatementChart>
                        </InfoCard>
                    }
                </div>
            </Hero>
        </Layout>
    )
}

export default Index