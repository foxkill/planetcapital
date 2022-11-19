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

interface IIncomeStatementProps {
    symbol: string
    exchange: string
}

const Index: React.FC<IIncomeStatementProps> = (props) => {
    const { exchange, symbol } = props

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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
                    <StatementCard caption={"Revenue"}>4.4B</StatementCard>
                    <StatementCard caption={"Gross Profit"}>1.2B</StatementCard>
                    <StatementCard caption={"Operating Income"}>435 M</StatementCard>
                    <StatementCard caption={"Net Income"}>373 M</StatementCard>
                </div>
            </Hero>
        </Layout>
    )
}

export default Index