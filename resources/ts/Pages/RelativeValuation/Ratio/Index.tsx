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
import HistoryChart from "@/Shared/Charts"

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
    const cdata = [
        {
            "id": "MHO",
            "data": [
                {
                    "x": "2016-10-01",
                    "y": 11.3
                },
                {
                    "x": "2016-11-01",
                    "y": 10.6
                },
                {
                    "x": "2016-12-01",
                    "y": 11.6
                },
                {
                    "x": "2017-01-01",
                    "y": 11.0
                },
                {
                    "x": "2017-02-01",
                    "y": 10.9
                },
                {
                    "x": "2017-03-01",
                    "y": 10.6
                },
                {
                    "x": "2017-04-01",
                    "y": 9.4
                },
                {
                    "x": "2017-05-01",
                    "y": 10.6
                },
                {
                    "x": "2017-06-01",
                    "y": 10.8
                },
                {
                    "x": "2017-07-01",
                    "y": 11.0
                },
                {
                    "x": "2017-08-01",
                    "y": 10.1
                },
                {
                    "x": "2017-09-01",
                    "y": 9.6
                },
                {
                    "x": "2017-10-01",
                    "y": 9.7
                },
                {
                    "x": "2017-11-01",
                    "y": 12.1
                },
                {
                    "x": "2017-12-01",
                    "y": 12.9
                },
                {
                    "x": "2018-01-01",
                    "y": 13.6
                },
                {
                    "x": "2018-02-01",
                    "y": 12.4
                },
                {
                    "x": "2018-03-01",
                    "y": 11.4
                },
                {
                    "x": "2018-04-01",
                    "y": 11.9
                },
                {
                    "x": "2018-05-01",
                    "y": 12.9
                },
                {
                    "x": "2018-06-01",
                    "y": 10.8
                },
                {
                    "x": "2018-07-01",
                    "y": 8.9
                },
                {
                    "x": "2018-08-01",
                    "y": 8.8
                },
                {
                    "x": "2018-09-01",
                    "y": 8.8
                },
                {
                    "x": "2018-10-01",
                    "y": 7.3
                },
                {
                    "x": "2018-11-01",
                    "y": 7.5
                },
                {
                    "x": "2018-12-01",
                    "y": 7.3
                },
                {
                    "x": "2019-01-01",
                    "y": 5.4
                },
            ]
        }
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
                        return <RatioCard caption={key} key={key}>9.9</RatioCard>
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
                    <InfoCard key={1} caption={"Statistics"} colSpan="col-span-1 lg:col-span-2">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>1 Year</th>
                                        <th>3 Years</th>
                                        <th>5 Years</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Average */}
                                    <tr className="hover">
                                        <th>Average</th>
                                        <td>4</td>
                                        <td>6.3</td>
                                        <td>7.8</td>
                                    </tr>
                                    {/* Median */}
                                    <tr className="hover">
                                        <th>Median</th>
                                        <td>3.9</td>
                                        <td>6</td>
                                        <td>3.1</td>
                                    </tr>
                                    {/* Min */}
                                    <tr className="hover">
                                        <th>Min</th>
                                        <td>3.1</td>
                                        <td>3.1</td>
                                        <td>3.1</td>
                                    </tr>
                                    {/* Max */}
                                    <tr className="hover">
                                        <th>Max</th>
                                        <td>4.9</td>
                                        <td>11</td>
                                        <td>12.1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </InfoCard>
                    <InfoCard key={2} caption={"History"} colSpan="col-span-1 lg:col-span-3">
                        <HistoryChart data={cdata}></HistoryChart>
                    </InfoCard>
                </div>
            </div>
        </div>
        {/* Forward Multiples */}
        <div className="hero min-h-[60vh] bg-base-200">
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
                    <RatioCard caption={"Forward P/E"} key={2}>9.6</RatioCard>
                    <RatioCard caption={"Forward P/E"} key={3}>9.6</RatioCard>
                </div>
            </div>
        </div>
    </Layout>
}

export default Ratio