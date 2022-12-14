//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import IIncomeStatement from "@/types/income-statement";
import moneyformat from "@/utils/moneyformat";

interface IStatementTableProps {
    incomeStatements: IIncomeStatement[]
}

const StatementTable: React.FC<IStatementTableProps> = (props) => {
    if (!props.incomeStatements || props.incomeStatements.length == 0) {
        return <></>
    }

    const incomeStatement = props.incomeStatements[0]
    const other =  incomeStatement.incomeTaxExpense - incomeStatement.totalOtherIncomeExpensesNet

    return (
        <div className="pl-2 overflow-x-auto w-full h-full">
            <table className="table w-full h-full text-slate-500">
                <tbody>
                    <tr className="hover">
                        <th className="hover rounded-none">Revenue</th>
                        <td className="text-right rounded-none font-bold">{moneyformat(incomeStatement.revenue, false, 0)}</td>
                    </tr>
                    <tr className="hover">
                        <th className="font-thin indent-8 text-ics-red">Cost of Revenue</th>
                        <td className="text-right text-ics-red">{moneyformat(incomeStatement.costOfRevenue, true, 0)}</td>
                    </tr>
                    <tr className="hover">
                        <th>Gross Profit</th>
                        <td className="text-right font-bold">{moneyformat(incomeStatement.grossProfit, false, 0)}</td>
                    </tr>
                    <tr className="hover">
                        <th className="font-thin indent-8 text-ics-red">Operating Expenses</th>
                        <td className="text-right text-ics-red">{moneyformat(incomeStatement.operatingExpenses, true, 0)}</td>
                    </tr>
                    <tr className="hover">
                        <th>Operating Income</th>
                        <td className="text-right font-bold">{moneyformat(incomeStatement.operatingIncome, false, 0)}</td>
                    </tr>
                    <tr className="hover">
                        <th className="font-thin indent-8 text-ics-red">Other Expenses</th>
                        <td className="text-right text-ics-red">{
                            moneyformat(other, true, 0)
                        }</td>
                    </tr>
                    <tr>
                        <th className="bg-slate-300 rounded-none">Net Income</th>
                        <td className="bg-slate-300 text-right rounded-none font-bold">{moneyformat(incomeStatement.netIncome, false, 0)}</td>
                    </tr>
                </tbody>
            </table>
        </div>)
}

export default StatementTable