//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { useContext, useMemo } from "react"
import Hero from "@/Shared/Hero"
import HugeHeader from "@/Shared/HugeHeader"
import CompanyInfo from "@/Shared/CompanyInfo"
import { Link } from "@inertiajs/inertia-react"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import HeatmapChart from "@/Shared/Charts/HeatmapChart"
import getHeatMap from "@/utils/heatmap"
import IRatio from "@/types/ratio"
import { useQuery } from "react-query"
import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import IIncomeStatement from "@/types/income-statement"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import Spinner from "@/Shared/Spinner"
import fetchBalanceSheetStatement from "@/planetapi/fetch.balance-sheet-statement"

type HeatmapPageProps = {
    symbol: string
    exchange: string
}

const Index: React.FC<HeatmapPageProps> = (props) => {
    // eslint-disable-next-line react/prop-types
    const { symbol, exchange } = props

    const { periodType } = useSecurity().context
    const limit = 10 + 1

    const queryKeyRatio = ["ratios", props.exchange, props.symbol, periodType].join("-").toLocaleLowerCase()
    const queryKeyIncome = ["income", props.exchange, props.symbol, periodType].join("-").toLocaleLowerCase()
    const queryKeyBalanceSheet = ["balance", props.exchange, props.symbol, periodType].join("-").toLocaleLowerCase()

    function percentage(data: object[], index: number, key: string): number {
        return (index == data.length - 1) ? 0 : (data[index][key] - data[index + 1][key]) / data[index + 1][key]
    }

    function buildHeatmapFromRatioData(
        ratio: IRatio[] | undefined | null,
        income: IIncomeStatement[] | undefined | null,
        balance: IBalanceSheetStatement[] | undefined | null): IHeatmapData[] {
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

    const ratioQuery = useQuery<IRatio[]>(
        [
            queryKeyRatio,
            {
                symbol: props.symbol,
                exchange: props.exchange,
                periodType,
                limit
            }
        ],
        fetchFinancialRatios,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [
            queryKeyIncome,
            { exchange, symbol, periodType, limit }
        ],
        fetchIncomeStatement as any,
        {
            enabled: Boolean(ratioQuery.isFetched),
            retry: false,
        }
    )

    const balanceSheetQuery = useQuery<IBalanceSheetStatement[]>(
        [
            queryKeyBalanceSheet,
            { exchange, symbol, periodType, limit }
        ],
        fetchBalanceSheetStatement as any,
        {
            enabled: Boolean(incomeStatementQuery.isFetched),
            retry: false
        }
    )

    const heatmap = buildHeatmapFromRatioData(
        ratioQuery.data,
        incomeStatementQuery.data,
        balanceSheetQuery.data
    )

    console.log(heatmap);

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
            <CompanyInfo></CompanyInfo>
            <SelectPeriod></SelectPeriod>
            {/* <HugeHeader padding={0} bold={false}>{exchange}:{symbol}</HugeHeader> */}
            <HugeHeader>Heatmap</HugeHeader>
            <div className="lg:w-[80vh] lg:h-[80vh] min-w-full min-h-full text-center h-96 w-[100rem]">
                {(ratioQuery.isLoading || incomeStatementQuery.isLoading) ?
                    (<Spinner width={24} height={24} />) :
                    (<HeatmapChart heatmap={heatmap} />)
                }
            </div>
        </Hero>
    </>
    )
}

export default Index