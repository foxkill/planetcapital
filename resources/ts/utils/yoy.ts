//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

function yoy(currentValue: number, priorValue: number): number {
    if (priorValue == 0 || currentValue == 0) {
        return 0
    }

    return ((currentValue/priorValue)-1) * 100
}

export default yoy