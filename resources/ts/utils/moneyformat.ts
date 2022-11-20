//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

function moneyformat(n: number): string {
    if (n === undefined) {
        return "N/A"
    }

    if (Number.isNaN(n)) {
        return "N/A"
    }

    if (n < 1e3) {
        return n.toLocaleString()
    }

    // Alter numbers larger than 1k
    const units = ["k", "M", "B", "T"];

    const order = Math.floor(Math.log(n.valueOf()) / Math.log(1000));

    const unitname = units[(order - 1)];
    const num = (n.valueOf() / 1000 ** order).toFixed(1)

    // output number remainder + unitname
    return num + " " + unitname
}

export default moneyformat