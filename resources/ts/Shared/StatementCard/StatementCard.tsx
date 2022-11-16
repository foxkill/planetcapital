//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"

interface IStatementCardProperties {
    children: React.ReactNode
    caption: string
}

const StatementCard: React.FC<IStatementCardProperties> = (props): JSX.Element => {
    const { caption, children } = props
    return (
        <div className="card card-bordered bg-base-100 hover:shadow-xl p-8">
            <div className="text-center text-5xl">{children}</div>
            <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-base font-bold">
                {caption}
            </div>
            <div className="card-body">
                Yes
            </div>
        </div>
    )
}

export default StatementCard