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
import Formula from "@/Shared/Formula"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import RatioCard from "@/Shared/RatioCard"
import InfoCard from "@/Shared/InfoCard"

interface IRatioProperties {
    ratio: string
    symbol: string
    exchange: string
}

function Ratio({ ratio, symbol, exchange }: IRatioProperties): JSX.Element {
    const displayRatio = ratio.split("-").join(" ")
    const ctx = useSecurity()
    const { data, error, loading } = ctx.context.information

    const valuations: Record<string, string>[] = [
        { "current p/e": "priceToOperatingCashFlowsRatio" },
        { "p/s": "priceToSalesRatio" },
        { "p/e": "priceEarningsRatio" }
    ]

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
        <Hero height={60}>
            <h2 className="!mt-0 mb-16 text-3xl font-bold min-h-[1rem] text-center uppercase pb-0">P/S
                <div className="text-gray-400 text-3xl uppercase font-light">{displayRatio}</div>
            </h2>
            <div className="alert alert-info shadow-lg pb-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="strokeCurrent flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                    <span>
                        <b>The Price to Free Cash Flow To Equity (P/FCFE)</b> ratio is a valuation multiple that compares a companys
                        market capitalization to the amount of free cash flow available for equity shareholders. This metric
                        is very similar to the P/OCF but is considered a more exact measure, owing to the fact that it uses
                        free cash flow, which subtracts capital expenditures (CapEx) from a companys operating cash flow.
                        <div className="divider"></div>
                        <Formula>P/OCF</Formula> = <Formula>Market Cap</Formula> / <Formula>FCFE</Formula>
                    </span>
                </div>
            </div>
            <div className="h-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {
                    valuations.map((value) => {
                        const [key, val] = Object.entries(value)[0]
                        return <RatioCard caption={key} key={key}>9.6</RatioCard>
                    })
                }
            </div>
        </Hero>
        { /* History */}
        <div className="hero min-h-[60vh] bg-base-300">
            <div className="hero-content flex-col w-full">
                <h2 className="!mt-0 mb-16 text-3xl font-bold min-h-[1rem] text-center uppercase pb-0">
                    P/E History
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 !w-full">
                    <InfoCard caption={"Statistics"} colSpan="col-span-1 lg:col-span-2">XL</InfoCard>
                    <InfoCard caption={"History"} colSpan="col-span-1 lg:col-span-3">XY</InfoCard>
                </div>
            </div>
        </div>
        {/* Forward Multiples */}
        <div className="hero min-h-[60vh] bg-base-300">
            <div className="hero-content flex-col w-full">
                <h2 className="!mt-0 mb-16 text-3xl font-bold min-h-[1rem] text-center uppercase pb-0">
                    P/E Forward Multiples
                </h2>
                <div className="alert alert-info shadow-lg pb-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="strokeCurrent flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                        <span>
                            <b>The Price to Free Cash Flow To Equity (P/FCFE)</b> ratio is a valuation multiple that compares a companys
                            market capitalization to the amount of free cash flow available for equity shareholders. This metric
                            is very similar to the P/OCF but is considered a more exact measure, owing to the fact that it uses
                            free cash flow, which subtracts capital expenditures (CapEx) from a companys operating cash flow.
                            <div className="divider"></div>
                            <Formula>P/OCF</Formula> = <Formula>Market Cap</Formula> / <Formula>FCFE</Formula>
                        </span>
                    </div>
                </div>
                <div className="h-4"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 !w-full">
                    <RatioCard caption={"Forward P/E"} key={1}>9.6</RatioCard>
                    <RatioCard caption={"Forward P/E"} key={1}>9.6</RatioCard>
                    <RatioCard caption={"Forward P/E"} key={1}>9.6</RatioCard>
                </div>
            </div>
        </div>
    </Layout>
}

export default Ratio