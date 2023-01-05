//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

export default function handleZero(value: number): number {
    return (Math.round(value) == 0) ? 0 : value
}