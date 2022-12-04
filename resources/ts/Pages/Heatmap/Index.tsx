//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { useMemo, useState } from "react"
import Hero from "@/Shared/Hero"
import HugeHeader from "@/Shared/HugeHeader"
import CompanyInfo from "@/Shared/CompanyInfo"
import { Link } from "@inertiajs/inertia-react"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import HeatmapChart from "@/Shared/Charts/HeatmapChart"
import getHeatMap from "@/utils/heatmap"
import IRatio from "@/types/ratio"
import { useQueries, UseQueryResult } from "react-query"
import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import IIncomeStatement from "@/types/income-statement"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import Spinner from "@/Shared/Spinner"
import fetchBalanceSheetStatement from "@/planetapi/fetch.balance-sheet-statement"
import Layout from "@/Shared/Layout"

interface IHeatmapPageProps {
    symbol: string
    exchange: string
}

interface IPage<P extends IHeatmapPageProps> extends React.FC<P> {
    layout?: (page: React.ReactNode) => JSX.Element
}

function percentage(data: object[], index: number, key: string): number {
    return (index == data.length - 1) ? 0 : (data[index][key] - data[index + 1][key]) / data[index + 1][key]
}

function buildHeatmapFromRatioData(
    ratio: IRatio[] | undefined | null,
    income: IIncomeStatement[] | undefined | null,
    balance: IBalanceSheetStatement[] | undefined | null): IHeatmapData[] {

    console.log(ratio, income, balance);


    if (!ratio || ratio.length === 0 || !ratio.map) { return [] }
    if (!income) { return [] }

    const hm = getHeatMap();

    const netProfitMargin = hm[0]
    const freeCashFlow = hm[1]
    const shsWeightedOut = hm[2]
    const cashAndShortTermInvestments = hm[3]
    const revenueGrowth = hm[4]
    const grossProfit = hm[5]
    const costOfRevenue = hm[6]
    const revenue = hm[7]
    const ebitda = hm[8]
    const operatingIncome = hm[9]
    const netIncome = hm[10]
    const debtToEquity = hm[11]
    const totalNonCurrentLiabilities = hm[12]
    const totalCurrentLiabilities = hm[13]
    const totalNonCurrentAssets = hm[14]
    const totalCurrentAssets = hm[15]

    ratio.map((value, index) => {
        netProfitMargin.data.push({ x: value.date, y: value.netProfitMargin, val: value.netProfitMargin })
        debtToEquity.data.push(
            {
                x: value.date,
                y: percentage(ratio, index, "debtEquityRatio"),
                val: value.debtEquityRatio
            })
        freeCashFlow.data.push({
            x: value.date,
            y: percentage(ratio, index, "freeCashFlowPerShare"),
            val: value.freeCashFlowPerShare
        })
    })

    if (!income) { return hm }

    income.map((value, index) => {
        revenueGrowth.data.push({
            x: value.date,
            y: percentage(income, index, "revenue"),
            val: value.revenue
        })

        grossProfit.data.push({
            x: value.date,
            y: percentage(income, index, "grossProfit"),
            val: value.grossProfit
        })

        costOfRevenue.data.push({
            x: value.date,
            y: percentage(income, index, "costOfRevenue"),
            val: value.costOfRevenue
        })

        revenue.data.push({
            x: value.date,
            y: percentage(income, index, "revenue"),
            val: value.revenue
        })

        ebitda.data.push({
            x: value.date,
            y: percentage(income, index, "ebitda"),
            val: value.ebitda
        })

        operatingIncome.data.push({
            x: value.date,
            y: percentage(income, index, "operatingIncome"),
            val: value.operatingIncome
        })

        netIncome.data.push({
            x: value.date,
            y: percentage(income, index, "netIncome"),
            val: value.netIncome
        })

        shsWeightedOut.data.push({
            x: value.date,
            y: percentage(income, index, "weightedAverageShsOut"),
            val: value.weightedAverageShsOut
        })
    })

    if (!balance) {
        return hm
    }

    balance.map((value, index) => {
        cashAndShortTermInvestments.data.push(
            {
                x: value.date,
                y: percentage(balance, index, "cashAndShortTermInvestments"),
                val: value.cashAndShortTermInvestments
            }
        )

        totalNonCurrentLiabilities.data.push(
            {
                x: value.date,
                y: percentage(balance, index, "totalNonCurrentLiabilities"),
                val: value.totalNonCurrentLiabilities
            }
        )

        totalCurrentLiabilities.data.push(
            {
                x: value.date,
                y: percentage(balance, index, "totalCurrentLiabilities"),
                val: value.totalCurrentLiabilities
            }
        )

        totalNonCurrentAssets.data.push(
            {
                x: value.date,
                y: percentage(balance, index, "totalNonCurrentAssets"),
                val: value.totalNonCurrentAssets
            }
        )

        totalCurrentAssets.data.push(
            {
                x: value.date,
                y: percentage(balance, index, "totalCurrentAssets"),
                val: value.totalCurrentAssets
            }
        )
    })

    // Remove the last entry, because it only served
    // for the calculation of the last value.
    return hm.map((value) => {
        value.data.pop()
        return value
    })
}

const useHeatmap = (exchange: string, symbol: string, periodType: string): { 
    isLoading: boolean,
    error: boolean,
    results: UseQueryResult[] } => {
    const queryKeyRatio = ["ratios", exchange, symbol, periodType].join("-").toLocaleLowerCase()
    const queryKeyIncome = ["income", exchange, symbol, periodType].join("-").toLocaleLowerCase()
    const queryKeyBalanceSheet = ["balance", exchange, symbol, periodType].join("-").toLocaleLowerCase()

    const queries = useQueries(
        [
            {
                queryKey: [queryKeyRatio],
                queryFn: fetchFinancialRatios,
                retry: false
            },
            {
                queryKey: [queryKeyIncome],
                queryFn: fetchIncomeStatement,
                retry: false
            },
            {
                queryKey: [queryKeyBalanceSheet],
                queryFn: fetchBalanceSheetStatement,
                retry: false
            },
        ],
    );
    
    const results = useMemo(() => { return queries }, [queries])
    const isLoading = !!queries.find(q => q.isFetching)
    const error = !!queries.find(q => q.isError)

    return {results, error, isLoading}
}

const Index: IPage<IHeatmapPageProps> = () => {
    const [heatmap, setHeatmap] = useState<IHeatmapData[]>([])
    const ctx = useSecurity()
    const { exchange, symbol, periodType, companyName } = ctx.context

    const result = useHeatmap(
        exchange,
        symbol,
        periodType
    )

    return (<>
        <Hero height={20}>
            <div className="text-sm breadcrumbs">
                <ul>
                    { /* Goes to parent */}
                    <li><Link href="/">{symbol.toLocaleUpperCase()}</Link></li>
                    <li>Heatmap</li>
                </ul>
            </div>
        </Hero>

        <Hero>
            <HugeHeader>{companyName}</HugeHeader>
            <HugeHeader>Heatmap</HugeHeader>
            <CompanyInfo></CompanyInfo>
            <SelectPeriod></SelectPeriod>
            {/* <HugeHeader padding={0} bold={false}>{exchange}:{symbol}</HugeHeader> */}
            <div className="lg:w-[80vh] lg:h-[80vh] min-w-full min-h-full text-center h-96 w-[100rem]">
                {
                    (result.error) ? 
                        (<div>Es ist ein Fehler aufgetreten</div>) : 
                        ((result.isLoading) ? (<Spinner width={24} height={24} />) : (<HeatmapChart heatmap={heatmap} />))
                }
            </div>
        </Hero>
    </>)
}

Index.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default Index