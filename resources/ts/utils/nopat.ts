//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

// Assume we have the following variables:
const revenue = 1000000; // the company's total revenue
const operatingCosts = 600000; // the company's total operating costs
const taxRate = 0.3; // the company's income tax rate

// Calculate the company's net operating profit
const netOperatingProfit = revenue - operatingCosts;

// Calculate the company's income tax expense
const taxExpense = netOperatingProfit * taxRate;

// Calculate the company's NOPAT
const nopat = netOperatingProfit - taxExpense;

// Print the company's NOPAT
console.log(nopat); // should print 200000

// Assume we have the following variables:
const equity = 500000; // the company's equity
const debt = 100000; // the company's debt

// Calculate the company's total invested capital
const totalInvestedCapital = equity + debt;

// Calculate the company's ROIC
const roic = nopat / totalInvestedCapital;

// Print the company's ROIC
console.log(roic); // should print 0.04

export default nopat
