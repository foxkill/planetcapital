//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import ValueIndicator from "../ValueIndicator/ValueIndicator"

interface IStatementCardProperties {
    children: React.ReactNode
    caption: string
}

const StatementCard: React.FC<IStatementCardProperties> = (props): JSX.Element => {
    const { caption, children } = props
    return (
        <div className="card bg-base-100 hover:shadow-xl p-4">
            <div className="text-center text-5xl">{children}</div>
            <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-base font-bold">
                {caption}
            </div>
            <div className="card-body p-0">
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full text-slate-500">
                        <tbody>
                            {/* 1 Year */}
                            <tr className="hover">
                                <th className="rounded-none">1 Year</th>
                                <td className="rounded-none text-right">
                                    <ValueIndicator unit="%">-4</ValueIndicator>
                                </td>
                            </tr>
                            {/* 3 Years */}
                            <tr className="hover">
                                <th>3 Years</th>
                                <td>
                                    <ValueIndicator unit="%">4</ValueIndicator>
                                </td>
                            </tr>
                            {/* 5 Years */}
                            <tr className="hover">
                                <th className="rounded-none">5 Years</th>
                                <td className="rounded-none">
                                    <ValueIndicator unit="%">-23</ValueIndicator>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StatementCard