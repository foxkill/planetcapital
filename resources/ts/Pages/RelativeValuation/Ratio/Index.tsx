//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { useState } from "react"
import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"
import { Link } from "@inertiajs/inertia-react"
import Formula from "@/Shared/Formula"
import RatioCard from "@/Shared/RatioCard"
import InfoCard from "@/Shared/InfoCard"
import HistoryChart from "@/Shared/Charts"
import { useQuery } from "react-query"
import IRatio from "@/types/ratio"
import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import { Serie } from "@nivo/line"
import { timeFormat, timeParse } from "d3-time-format"

interface IRatioProperties {
    symbol: string
    exchange: string
    ratio: string
    ratioShortName: string
    ratioCamelCaseName: string
    ratioDefinition: string
    ratioExplicitName: string
    ratioFormula: string
}

function Ratio(props: IRatioProperties): JSX.Element {
    const [data, setData] = useState<Serie[]>([])
    const displayRatio = props.ratio.split("-").join(" ")

    useQuery<IRatio[]>(
        [
            ["ratios", props.symbol, props.exchange, "FY"].join("-").toLocaleLowerCase(),
            {
                symbol: props.symbol,
                exchange: props.exchange,
                periodType: "FY",
                limit: 10
            }
        ],
        fetchFinancialRatios,
        {
            enabled: Boolean(props.symbol && props.exchange),
            retry: false,
            onSuccess: (data: IRatio[]) => {
                const tp = timeParse("%Y-%m-%d")
                const tf = timeFormat("%b-%Y")
                const currentDate = new Date()

                const dp = data.map((v) => {
                    const parsedDate = (v.date as unknown as string).split("-")

                    const pd = tp(v.date as unknown as string) ?? currentDate
                    const formattedDate = tf(pd)
                    return {
                        x: parsedDate[0] + "-01-01",
                        y: v.currentRatio.toPrecision(2),
                        d: formattedDate
                    }
                })

                const serie: Serie = {
                    id: props.symbol,
                    data: dp
                }

                // setData(serie)
                setData([serie])
                // context.information.data = data
                // context.information.error = null
                // context.information.loading = false
            },
            onError: (err) => {
                // context.information.data = null
                // context.information.error = err
                // context.information.loading = false
            }
        }
    )

    const valuations: Record<string, string>[] = [
        { "current": "priseToSalesRatio" },
        { "median": "priceToSalesRatio" },
        { "industry": "priceToSalesRatio" }
    ]

    return <Layout>
        <Hero height={20}>
            <div className="text-sm breadcrumbs">
                <ul>
                    {/* Goes to summary */}
                    <li><a>{props.symbol.toUpperCase()}</a></li>
                    { /* Goes to parent */}
                    <li><Link href={`/security/${props.exchange.toLowerCase()}/${props.symbol.toLowerCase()}/relative-valuation`}>Relative Valuation</Link></li>
                    <li>{props.ratio}</li>
                </ul>
            </div>
        </Hero>
        <Hero height={60}>
            <h2 className="!mt-0 mb-16 text-3xl font-bold min-h-[1rem] text-center uppercase pb-0">{props.ratioShortName}
                <div className="text-gray-400 text-3xl uppercase font-light">{displayRatio}</div>
            </h2>
            <div className="alert alert-info shadow-lg pb-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="strokeCurrent flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                    <span>
                        The <b>{props.ratioExplicitName + " (" + props.ratioShortName.toUpperCase()+")"} </b>{props.ratioDefinition}
                        <div className="divider"></div>
                        <Formula>P/OCF</Formula> = <Formula>Market Cap</Formula> / <Formula>FCFE</Formula>
                    </span>
                </div>
            </div>
            <div className="h-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {
                    valuations.map((value) => {
                        const [key] = Object.entries(value)[0]
                        return <RatioCard caption={key + " " + props.ratioShortName} key={key}>9.9</RatioCard>
                    })
                }
            </div>
        </Hero>
        { /* History */}
        <div className="hero min-h-[60vh] bg-base-300">
            <div className="hero-content flex-col w-full">
                <h2 className="!mt-0 mb-16 text-3xl font-bold min-h-[1rem] text-center uppercase pb-0">
                    {props.ratioShortName} History
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 !w-full">
                    <InfoCard key={1} caption={"Statistics"} ratio={props.ratioExplicitName} colSpan="col-span-1 lg:col-span-2">
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
                    <InfoCard key={2} caption={"History"} ratio={props.ratioExplicitName} colSpan="col-span-1 lg:col-span-3">
                        <HistoryChart data={data} ratioShortName={props.ratioShortName}></HistoryChart>
                    </InfoCard>
                </div>
            </div>
        </div>
        {/* Forward Multiples */}
        <div className="hero min-h-[60vh] bg-base-200">
            <div className="hero-content flex-col w-full">
                <h2 className="!mt-0 mb-16 text-3xl font-bold min-h-[1rem] text-center uppercase pb-0">
                    {props.ratioShortName} Forward Multiples
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
                    <RatioCard caption={`Forward ${props.ratioShortName}`} key={1} symbol={props.symbol}>9.6</RatioCard>
                    <RatioCard caption={`Forward ${props.ratioShortName}`} key={2} symbol={props.symbol}>9.7</RatioCard>
                    <RatioCard caption={`Forward ${props.ratioShortName}`} key={3} symbol={props.symbol}>9.8</RatioCard>
                </div>
            </div>
        </div>
    </Layout>
}

export default Ratio