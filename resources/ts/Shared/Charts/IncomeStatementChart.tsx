//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import { ResponsiveSankey } from "@nivo/sankey"
import IIncomeStatement from "@/types/income-statement"
import moneyformat from "@/utils/moneyformat"
import { PaletteColors } from "react-palette"
import otherExpenses from "@/utils/otherexpenses"

interface IIncomeStatementProps {
    palette: PaletteColors
    data: IIncomeStatement[]
}

const IncomeStatementChart: React.FC<IIncomeStatementProps> = (props) => {
    const { data, palette } = props

    if (!data || data.length == 0) {
        return <></>
    }

    const incomestatement = data[0]
    const other = otherExpenses(incomestatement)
    
    const idata = {
        "nodes": [
            {
                id: "Revenue",
                nodeColor: palette.vibrant,
                fixedValue: Math.abs(incomestatement.revenue),
                signed: incomestatement.revenue < 0
            },
            {
                id: "Cost of Revenue",
                nodeColor: "#F14336",
                fixedValue: Math.abs(incomestatement.costOfRevenue),
                signed: incomestatement.costOfRevenue < 0
            },
            {
                id: "Gross Profit",
                nodeColor: "#28B446",
                fixedValue: Math.abs(incomestatement.grossProfit),
                signed: incomestatement.grossProfit < 0
            },
            {
                id: "Operating Expenses",
                nodeColor: "red",
                fixedValue: Math.abs(incomestatement.operatingExpenses),
                signed: incomestatement.operatingExpenses < 0
            },
            {
                id: "Operating Income",
                nodeColor: "#2BA02B",
                fixedValue: Math.abs(incomestatement.operatingIncome),
                signed: incomestatement.operatingIncome < 0
            },
            {
                // TODO: use green color for positive expenses.
                id: "Other Expenses",
                nodeColor: "red",
                fixedValue: Math.abs(other),
                signed: other < 0
            },
            {
                id: "Net Income",
                nodeColor: "green",
                fixedValue: Math.abs(incomestatement.netIncome),
                signed: incomestatement.netIncome < 0
            },
        ],
        "links": [
            {
                source: "Revenue",
                target: "Cost of Revenue",
                value: Math.abs(incomestatement.costOfRevenue)
            },
            {
                source: "Revenue",
                target: "Gross Profit",
                value: Math.abs(incomestatement.grossProfit)
            },
            {
                source: "Gross Profit",
                target: "Operating Expenses",
                value: Math.abs(incomestatement.operatingExpenses)
            },
            {
                source: "Gross Profit",
                target: "Operating Income",
                value: Math.abs(incomestatement.operatingIncome),
            },
            {
                source: "Operating Income",
                target: "Other Expenses",
                value: Math.abs(other)
                // value: other < 0 ? Math.abs(other) : other
                // value: incomestatement.totalOtherIncomeExpensesNet
                // value: incomestatement.costAndExpenses
                // value: incomestatement.operatingIncome - incomestatement.netIncome
            },
            {
                source: "Operating Income",
                target: "Net Income",
                value: Math.abs(incomestatement.netIncome),
                signed: incomestatement.netIncome < 0
            },
        ]
    }

    const c = idata.nodes.map((n) => n.nodeColor)

    return <ResponsiveSankey
        nodeTooltip={(nd): JSX.Element => {
            // TODO: use alert shadow-lg from daisyui
            const { node } = nd
            const fmt = moneyformat(node.value, node.signed)
            return (
                <>
                    <div className="w-40 rounded" style={{ background: "white", padding: "9px 12px", border: "1px solid #ccc" }}>
                        <div className="text-center font-bold">{node.label}</div>
                        <hr></hr>
                        <div key={node.id} style={{ padding: "3px 0" }}>
                            <div className="text-center">{fmt}</div>
                        </div>
                    </div>
                </>
            )
        }}
        // valueFormat={"$,"}
        linkTooltip={(nd): JSX.Element => {
            // TODO: use alert shadow-lg from daisyui
            const { source, target } = nd.link
            return <>
                <div className="w-60 rounded" style={{ background: "white", padding: "9px 12px", border: "1px solid #ccc" }}>
                    <div className="text-center font-bold">{source.label + " - " + target.label}</div>
                    <hr></hr>
                    <div key={source.id} style={{ padding: "3px 0" }}>
                        <div className="text-center">{moneyformat(target.value, target.signed)}</div>
                    </div>
                </div>
            </>
        }}
        // label={(d) => d.id + " (" + moneyformat(d.value) + ")"}
        // colorsBy={node => {console.log(node); return node.color}}
        data={idata}
        animate
        margin={{ top: 0, right: 0, bottom: 20, left: 0 }}
        align="justify"
        colors={c}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={12}
        nodeBorderWidth={1}
        nodeBorderRadius={2}
        sort="auto"
        nodeBorderColor={{
            from: "color",
            modifiers: [
                [
                    "darker",
                    0.8
                ]
            ]
        }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        // nodeBorderRadius={1}
        // linkContract={3}
        // labelPosition="outside"
        // labelOrientation="vertical"
        labelPadding={10}
        labelTextColor={{
            from: "color",
            modifiers: [
                [
                    "darker",
                    1
                ]
            ]
        }}></ResponsiveSankey>
}

export default IncomeStatementChart 