//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import IIncomeStatement from "@/types/income-statement"

function otherExpenses(incomestatement: IIncomeStatement): number {
    return incomestatement.incomeTaxExpense - incomestatement.totalOtherIncomeExpensesNet
}

export default otherExpenses