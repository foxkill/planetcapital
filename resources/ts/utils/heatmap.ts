//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { IHeatmapData } from "@/types/iheatmapdata"

/**
 * Return an empty heatmap data array.
 * 
 * @returns IHeatmapData[]
 */
function getHeatMap(): IHeatmapData[] {
    return [
        {
            // 0
            id: "Net Profit Margin",
            data: [],
            key: "netProfitMargin"
        },
        {
            // 1
            id: "Price to Free Cash Flow Ratio",
            data: [],
            key: "priceToFreeCashFlowsRatio"
        },
        {
            // 2
            id: "Shares Outstanding",
            data: [],
            key: "weightedAverageShsOut"
        },
        {
            // 3
            id: "Cash & Short Term Investments",
            data: [],
            key: "cashAndShortTermInvestments"
        },
        {
            // 4
            id: "Revenue Growth",
            data: [],
            key: "revenue"
        },
        {
            // 5
            id: "Gross Profit",
            data: [],
            key: "grossProfit"
        },
        {
            // 6
            id: "Cost of Revenue",
            data: [],
            key: "costOfRevenue"
        },
        {
            // 7
            id: "Revenue",
            data: [],
            key: "reneue"
        },
        {
            // 8
            id: "EBITDA",
            data: [],
            key: "ebitda"
        },
        {
            // 9
            id: "Operating Income",
            data: [],
            key: "operatingIncome"
        },
        {
            // 10
            id: "Net Income",
            data: [],
            key: "netIncome"
        },
        {
            // 11
            id: "Debt/Equity",
            data: [],
            key: "debtEquityRatio"
        },
        {
            // 12
            id: "Total non-current liabilities",
            data: [],
            key: "totalNonCurrentLiabilities"
        },
        {
            // 13
            id: "Total current liabilities",
            data: [],
            key: "totalCurrentLiabilities"
        },
        {
            // 14
            id: "Total non-current assets",
            data: [],
            key: "totalNonCurrentAssets"
        },
        {
            // 15
            id: "Total current assets",
            data: [],
            key: "totalCurrentAssets"
        },
    ]
}

export default getHeatMap