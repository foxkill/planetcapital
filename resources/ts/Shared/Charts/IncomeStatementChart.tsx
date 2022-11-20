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

interface IIncomeStatementProps {
    primaryColor: string
    data: IIncomeStatement[]
}

const IncomeStatementChart: React.FC<IIncomeStatementProps> = (props) => {
    const { data, primaryColor } = props
    const incomestatement = data[0]
    const idata = {
        "nodes": [
            {
                id: "Revenue",
                nodeColor: primaryColor,
                fixedValue: incomestatement.revenue,
                value: incomestatement.revenue
            },
            {
                id: "Cost of Revenue",
                nodeColor: "red",
            },
            {
                id: "Gross Profit",
                nodeColor: "rgb(58, 153, 58)",
            },
            {
                id: "Operating Expenses",
                nodeColor: "red",
            },
            {
                id: "Operating Income",
                nodeColor: "green",
            },
            {
                id: "Other Expenses",
                nodeColor: "red",
            },
            {
                id: "Net Income",
                nodeColor: "green",
            },
        ],
        "links": [
            {
                source: "Revenue",
                target: "Cost of Revenue",
                value: incomestatement.costOfRevenue
            },
            {
                source: "Revenue",
                target: "Gross Profit",
                value: incomestatement.grossProfit
            },
            {
                source: "Gross Profit",
                target: "Operating Expenses",
                value: incomestatement.operatingExpenses
            },
            {
                source: "Gross Profit",
                target: "Operating Income",
                value: incomestatement.operatingIncome
            },
            {
                source: "Operating Income",
                target: "Other Expenses",
                value: incomestatement.otherExpenses
            },
            {
                source: "Operating Income",
                target: "Net Income",
                value: incomestatement.netIncome
            },
        ]
    }

    const c = idata.nodes.map((n) => n.nodeColor)
    return <ResponsiveSankey
        nodeTooltip={(nd): JSX.Element => {
            const { node } = nd
            const fmt = moneyformat(node.value)
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
        valueFormat={"$,"}
        linkTooltip={(nd): JSX.Element => {
            const { source, target } = nd.link
            // const fmt = moneyformat(node.value)
            return <>
                <div className="w-60 rounded" style={{ background: "white", padding: "9px 12px", border: "1px solid #ccc" }}>
                    <div className="text-center font-bold">{source.label + " - " + target.label}</div>
                    <hr></hr>
                    <div key={nd.link.id} style={{ padding: "3px 0" }}>
                        <div className="text-center">{moneyformat(target.value)}</div>
                    </div>
                </div>
            </>
        }}
        // colorsBy={node => {console.log(node); return node.color}}
        data={idata}
        animate
        margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
        align="justify"
        colors={c}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={12}
        nodeBorderWidth={0}
        sort="auto"
        // nodeBorderColor={{
        //     from: "color",
        //     modifiers: [
        //         [
        //             "darker",
        //             0.8
        //         ]
        //     ]
        // }}
        // nodeBorderRadius={1}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        // linkContract={3}
        enableLinkGradient={true}
        // labelPosition="outside"
        // labelOrientation="vertical"
        labelPadding={16}
        labelTextColor={{
            from: "color",
            modifiers: [
                [
                    "darker",
                    1
                ]
            ]
        }}
    ></ResponsiveSankey>
}

export { IncomeStatementChart }