//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

function moneyformat(n: number, invert: boolean = false, fractionDigits: number = 1): string {
    if (n === undefined) {
        return "N/A"
    }

    if (Number.isNaN(n)) {
        return "N/A"
    }

    const isNegativeNumber = n < 0

    const num = Math.abs(n)

    if (num < 1e3) {
        return n.toLocaleString()
    }

    // Alter numbers larger than 1k
    const units = ["k", "M", "B", "T"];

    const order = Math.floor(Math.log(num) / Math.log(1000));

    const unitname = units[(order - 1)];
    let result = (num / 1000 ** order)

    if (isNegativeNumber) {
        result = -result 
    }

    if (invert) {
        result = -result
    }

    return result.toFixed(fractionDigits) + unitname
}

export default moneyformat