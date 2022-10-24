//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"

interface IFormulaProperties {
    children: React.ReactNode
}

function Formula({children}: IFormulaProperties): JSX.Element {
    return (
        <div className="leading-4 text-sm bg-none bg-white border-1 rounded p-1 font-mono inline-block">{children}</div>
    )
}

export default Formula