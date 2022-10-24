//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"

function HugeHeader({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="pb-6 text-center">
            <h1 className="uppercase text-4xl font-bold">{children}</h1>
        </div>
    )
}

export default HugeHeader