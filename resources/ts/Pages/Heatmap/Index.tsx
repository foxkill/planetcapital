//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import Hero from "@/Shared/Hero"
import HugeHeader from "@/Shared/HugeHeader"
import CompanyInfo from "@/Shared/CompanyInfo"
import { Link } from "@inertiajs/inertia-react"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import HeatmapChart from "@/Shared/Charts/HeatmapChart"
import getHeatMap from "@/utils/heatmap"
import IRatio from "@/types/ratio"
import { useQueries } from "react-query"
import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import IIncomeStatement from "@/types/income-statement"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import Spinner from "@/Shared/Spinner"
import fetchBalanceSheetStatement from "@/planetapi/fetch.balance-sheet-statement"
import Layout from "@/Shared/Layout"
import { IHeatmapData } from "@/types/iheatmapdata"

interface IHeatmapPageProps {
    symbol: string
    exchange: string
}

interface IPage<P extends IHeatmapPageProps> extends React.FC<P> {
    layout?: (page: React.ReactNode) => JSX.Element
}

function percentage(data: object[], index: number, key: string): number {
    // if(lastyear>0,(thisyear/lastyear-1),((thisyear+abs(lastyear)/abs(lastyear))
    // if (index == data.length - 1) { return 0 }
    // const prevValue = data[index + 1][key]
    // const curValue = data[index][key]

    // if (prevValue > 0) {
    //     return (curValue/prevValue) - 1
    // }

    // return curValue + Math.abs(prevValue) / Math.abs(prevValue)
    return (index == data.length - 1) ? 0 : (data[index][key] - data[index + 1][key]) / Math.abs(data[index + 1][key])
}

function buildHeatmapFromRatioData(hm: IHeatmapData[],
    ratio: IRatio[] | undefined | null,
    income: IIncomeStatement[] | undefined | null,
    balance: IBalanceSheetStatement[] | undefined | null): void {
    // const hm = getHeatMap();
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


    const ratios = [netProfitMargin, debtToEquity, freeCashFlow]

    // Work on ratio?
    if (ratio && ratio.length && ratio.map) {
        ratio.map((value, index) => {
            netProfitMargin.data.push({
                x: value.date,
                y: value.netProfitMargin,
                value: value.netProfitMargin
            })
            debtToEquity.data.push({
                x: value.date,
                y: percentage(ratio, index, "debtEquityRatio"),
                value: value.debtEquityRatio
            })
            freeCashFlow.data.push({
                x: value.date,
                y: percentage(ratio, index, "freeCashFlowPerShare"),
                value: value.freeCashFlowPerShare
            })
        })
        ratios.map(v => v.data.pop())
    }

    if (income && income.length && income.map) {
        const incomes = [
            revenueGrowth,
            grossProfit,
            costOfRevenue,
            revenue,
            ebitda,
            operatingIncome,
            netIncome,
            shsWeightedOut,
        ]
        // console.count("Sorry, doing a recalculation on IIncome");
        income.map((value, index) => {
            revenueGrowth.data.push({
                x: value.date,
                y: percentage(income, index, "revenue"),
                value: value.revenue
            })

            grossProfit.data.push({
                x: value.date,
                y: percentage(income, index, "grossProfit"),
                value: value.grossProfit
            })

            costOfRevenue.data.push({
                x: value.date,
                y: percentage(income, index, "costOfRevenue"),
                value: value.costOfRevenue
            })

            revenue.data.push({
                x: value.date,
                y: percentage(income, index, "revenue"),
                value: value.revenue
            })

            ebitda.data.push({
                x: value.date,
                y: percentage(income, index, "ebitda"),
                value: value.ebitda
            })

            operatingIncome.data.push({
                x: value.date,
                y: percentage(income, index, "operatingIncome"),
                value: value.operatingIncome
            })

            netIncome.data.push({
                x: value.date,
                y: percentage(income, index, "netIncome"),
                value: value.netIncome
            })

            shsWeightedOut.data.push({
                x: value.date,
                y: percentage(income, index, "weightedAverageShsOut"),
                value: value.weightedAverageShsOut
            })
        })

        incomes.map(v => v.data.pop())
    }

    if (balance && balance.length && balance.map) {
        console.count("Sorry, doing a recalculation on IBalance");
        const balances = [
            cashAndShortTermInvestments, 
            totalNonCurrentLiabilities, 
            totalCurrentLiabilities,
            totalNonCurrentAssets,
            totalCurrentAssets
        ]

        balance.map((value, index) => {
            cashAndShortTermInvestments.data.push(
                {
                    x: value.date,
                    y: percentage(balance, index, "cashAndShortTermInvestments"),
                    value: value.cashAndShortTermInvestments
                }
            )

            totalNonCurrentLiabilities.data.push(
                {
                    x: value.date,
                    y: percentage(balance, index, "totalNonCurrentLiabilities"),
                    value: value.totalNonCurrentLiabilities
                }
            )

            totalCurrentLiabilities.data.push(
                {
                    x: value.date,
                    y: percentage(balance, index, "totalCurrentLiabilities"),
                    value: value.totalCurrentLiabilities
                }
            )

            totalNonCurrentAssets.data.push(
                {
                    x: value.date,
                    y: percentage(balance, index, "totalNonCurrentAssets"),
                    value: value.totalNonCurrentAssets
                }
            )

            totalCurrentAssets.data.push(
                {
                    x: value.date,
                    y: percentage(balance, index, "totalCurrentAssets"),
                    value: value.totalCurrentAssets
                }
            )
        })

        balances.map(v => v.data.pop())
    }

    // Remove the last entry, because it only served
    // for the calculation of the last value.
    // return hm.map((value) => {
    //     value.data.pop()
    //     return value
    // })
}

const useHeatmap = (exchange: string, symbol: string, periodType: string): {
    isLoading: boolean,
    error: boolean,
    heatmap: IHeatmapData[]
} => {
    const queryKeyRatio = ["ratios", exchange, symbol, periodType].join("-").toLocaleLowerCase()
    const queryKeyIncome = ["income", exchange, symbol, periodType].join("-").toLocaleLowerCase()
    const queryKeyBalanceSheet = ["balance", exchange, symbol, periodType].join("-").toLocaleLowerCase()
    const limit = 10 + 1
    const params = { symbol, exchange, periodType, limit }

    let hm = getHeatMap()

    const queries = useQueries(
        [
            {
                queryKey: [queryKeyRatio, params],
                select: (data: IRatio[]) => buildHeatmapFromRatioData(hm, data, null, null),
                enabled: Boolean(symbol && exchange),
                queryFn: fetchFinancialRatios,
            },
            {
                queryKey: [queryKeyIncome, params],
                select: (data: IIncomeStatement[]) => buildHeatmapFromRatioData(hm, null, data, null),
                enabled: Boolean(symbol && exchange),
                queryFn: fetchIncomeStatement,
            },
            {
                queryKey: [queryKeyBalanceSheet, params],
                select: (data: IBalanceSheetStatement[]) => buildHeatmapFromRatioData(hm, null, null, data),
                enabled: Boolean(symbol && exchange),
                queryFn: fetchBalanceSheetStatement,
            },
        ],
    );

    // allDone = queries.every(q => q.isSuccess)
    const isLoading = !!queries.find(q => q.isFetching)
    const error = !!queries.find(q => q.isError)

    return { heatmap: hm, error, isLoading }
}

const Index: IPage<IHeatmapPageProps> = () => {
    // const [heatmap, setHeatmap] = useState<IHeatmapData[]>([])
    const ctx = useSecurity()
    const { exchange, symbol, periodType, companyName } = ctx.context

    const result = useHeatmap(
        exchange,
        symbol,
        periodType
    )

    const heatmap = result.heatmap

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