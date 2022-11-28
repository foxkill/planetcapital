//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

function toPercentage(price: number, change: number): number {
    const oldPrice = price - change
    return (change / oldPrice) * 100
}

export default toPercentage