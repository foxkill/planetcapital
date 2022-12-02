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

type HeatmapPageProps = {
    symbol: string
    exchange: string
}

const Index: React.FC<HeatmapPageProps> = (props) => {
    // eslint-disable-next-line react/prop-types
    const { symbol, exchange } = props

    const { periodType } = useSecurity().context
    const limit = 10

    const queryKeyRatio = ["ratios", props.exchange, props.symbol, periodType].join("-").toLocaleLowerCase()
    const queryKeyIncome = ["income", props.exchange, props.symbol, periodType].join("-").toLocaleLowerCase()

    function buildHeatMapFromRatioData(data: IRatio[] | undefined | null,
        income: IIncomeStatement[] | undefined | null): IHeatmapData[] {
        if (!data) { return [] }

        const hm = getHeatMap();

        const netProfitMargin = hm[0]
        const freeCashFlow = hm[1]
        const shsWeightedOut = hm[2]
        const cashAndShortTermInvestments = hm[3]
        // (Current Period Revenue – Previous Period Revenue) / Previous Period Revenue
        //  https://financialmodelingprep.com/api/v3/income-statement-growth/AAPL?apikey=9ef6523fd6e3c14ad46caf2464984c05 
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

        data.map((value) => {
            netProfitMargin.data.push({ x: value.date, y: value.netProfitMargin })
            debtToEquity.data.push({ x: value.date, y: value.debtEquityRatio })
            freeCashFlow.data.push({ x: value.date, y: value.freeCashFlowPerShare })
        })

        if (!income) { return hm }

        income.map((value) => {
            ebitda.data.push({ x: value.date, y: value.ebitda })
            grossProfit.data.push({ x: value.date, y: value.grossProfit })
            costOfRevenue.data.push({ x: value.date, y: value.costOfRevenue })
            revenue.data.push({ x: value.date, y: value.revenue })
            operatingIncome.data.push({ x: value.date, y: value.operatingIncome })
            netIncome.data.push({ x: value.date, y: value.netIncome })
            shsWeightedOut.data.push({ x: value.date, y: value.weightedAverageShsOut })

            cashAndShortTermInvestments.data.push({ x: value.date, y: 0 })
            totalNonCurrentLiabilities.data.push({ x: value.date, y: 0 })
            totalCurrentLiabilities.data.push({ x: value.date, y: 0 })
            totalNonCurrentAssets.data.push({ x: value.date, y: 0})
            totalCurrentAssets.data.push({ x: value.date, y: 0 })
        })

        // Calculate revenue growth
        income.map((v, i, t) => {
            const revenueGrowthPercentage =
                (i == t.length - 1)
                    ? 0
                    : (v.revenue - t[i + 1].revenue) / t[i + 1].revenue
            revenueGrowth.data.push({ x: v.date, y: revenueGrowthPercentage*100 })
        })

        return hm;
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
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    const heatmap = useMemo(
        () => buildHeatMapFromRatioData(ratioQuery.data, incomeStatementQuery.data), 
        [periodType]
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
            <div className="lg:w-[80vh] lg:h-[80vh] min-w-full min-h-full h-96 w-96 border-2 border-sky-500 border-solid">
                <HeatmapChart heatmap={heatmap} />
            </div>
        </Hero>
    </>
    )
}

export default Index