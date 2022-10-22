//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"
import { Link } from "@inertiajs/inertia-react"

interface IRatioProperties {
    ratio: string
    symbol: string
    exchange: string
}

function Ratio({ratio, symbol, exchange}: IRatioProperties): JSX.Element {
    return <Layout>
        <Hero height={20}>
            <div className="text-sm breadcrumbs">
                <ul>
                    {/* Goes to summary */}
                    <li><a>{symbol.toUpperCase()}</a></li>
                    { /* Goes to parent */}
                    <li><Link href={`/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/relative-valuation`}>Relative Valuation</Link></li>
                    <li>{ratio}</li>
                </ul>
            </div>
        </Hero>
        <Hero>
            <h1>{ratio} - {exchange} - {symbol}</h1>
        </Hero>
    </Layout>
}

export default Ratio