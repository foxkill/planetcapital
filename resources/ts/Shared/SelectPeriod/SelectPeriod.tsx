//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import PeriodTypes from "@/types/period"
import React from "react"
import { useSecurity } from "../SecurityContext/SecurityContext"

const SelectPeriod = (): JSX.Element => {
    const securityContext = useSecurity()

    const periodTypes: PeriodTypes[] = ["FY", "TTM", "QTR"]

    const currentPeriodType = securityContext.context.periodType

    function setPeriod(event: React.MouseEvent<HTMLInputElement>): void {
        const periodType = (event.target as HTMLInputElement).getAttribute("data-value") as PeriodTypes

        if (!periodType || periodTypes.indexOf(periodType) < 0) {
            return
        }

        if (securityContext) {
            securityContext.setContext({ ...securityContext.context, periodType })
        }
    }

    return (<div className="hero bg-base-200 min-h-[10vh]">
        <div className="hero-content gap-10">
            {
                periodTypes.map((value, index) => {
                    return (
                        <div className="form-control" key={value}>
                            <label className="label cursor-pointer">
                                <span className="label-text mr-5">{value}</span>
                                <input key={index} onClick={(e: React.MouseEvent<HTMLInputElement>): void => setPeriod(e)} type="radio" data-value={value} name="radio-period" className="radio" defaultChecked={value == currentPeriodType} />
                            </label>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}

export default SelectPeriod