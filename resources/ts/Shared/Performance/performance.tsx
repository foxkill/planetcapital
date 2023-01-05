//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import ValueIndicator from "../ValueIndicator/ValueIndicator"

const DEFAULT_FRACTION_DIGITS = 2

type PerformanceEntry = Record<number, number>

type PerformanceTableProps = {
    performance: PerformanceEntry[]
    fractionDigits?: number
}

const PerformanceTable: React.FC<PerformanceTableProps> = (props) => {
    const digits = props.fractionDigits ?? DEFAULT_FRACTION_DIGITS

    return (
        <table className="table table-compact w-full text-slate-500 z-0">
            <tbody>
                {props.performance.map((perf) => {
                    const [key, value] = Object.entries(perf)[0]
                    return (
                        <>
                            <tr key={key} className="hover">
                                <th className="rounded-none">{key} {parseInt(key) > 1 ? "Years" : "Year"}</th>
                                <td className="rounded-none text-right border-b-0 w-28">
                                    <ValueIndicator unit="%">{Number.isNaN(value) ? "N/A" : value.toFixed(digits)}</ValueIndicator>
                                </td>
                            </tr>
                        </>
                    )
                })
                }
            </tbody>
        </table>
    )
}

export default PerformanceTable