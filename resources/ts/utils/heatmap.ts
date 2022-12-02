//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

function getHeatMap(): IHeatmapData[] {
    return [
        {
            // 0
            id: "Net Profit Margin",
            data: [],
            format: "p"
        },
        {
            // 1
            id: "Free Cash Flow",
            data: [],
            format: "m"
        },
        {
            // 2
            id: "Shares (Basic, Weighted)",
            data: [],
            format: "m"
        },
        {
            // 3
            id: "Cash & Short Term Investments",
            data: [],
            format: "m"
        },
        {
            // 4
            id: "Revenue Growth",
            data: [],
            format: "p"
        },
        {
            // 5
            id: "Gross Profit",
            data: [],
            format: "m"
        },
        {
            // 6
            id: "Cost of Revenue",
            data: [],
            format: "m"
        },
        {
            // 7
            id: "Revenue",
            data: [],
            format: "m"
        },
        {
            // 8
            id: "EBITDA",
            data: [],
            format: "m"
        },
        {
            // 9
            id: "Operating Income",
            data: [],
            format: "m"
        },
        {
            // 10
            id: "Net Income",
            data: [],
            format: "m"
        },
        {
            // 11
            id: "Debt/Equity",
            data: [],
            format: "s"
        },
        {
            // 12
            id: "Total non-current liabilities",
            data: [],
            format: "m"
        },
        {
            // 13
            id: "Total current Liabilities",
            data: [],
            format: "m"
        },
        {
            // 14
            id: "Total non-current assets",
            data: [],
            format: "m"
        },
        {
            // 15
            id: "Total current assets",
            data: [],
            format: "m"
        },
    ]
}

export default getHeatMap