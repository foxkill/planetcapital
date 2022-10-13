//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import PeriodTypes from '@/types/period'
import React from 'react'
import { useSecurity } from '../SecurityContext/SecurityContext'

const SelectPeriod = (): JSX.Element => {
    const securityContext = useSecurity()

    const periodTypes: PeriodTypes[] = ["FY", "TTM", "QTR"]

    function setPeriod(event) {
        const periodType = event.target.getAttribute('data-value') as PeriodTypes

        if (!periodType || periodTypes.indexOf(periodType) < 0) {
            return
        }

        if (securityContext) {
            securityContext.setContext({ ...securityContext.context, periodType })
        }
    }

    return (<>
        {
            periodTypes.map((value, index) => {
                const checked = value === securityContext.context.periodType ? true : false
                return <div className="form-control" key={value}>
                    <label className="label cursor-pointer">
                        <span className="label-text">{value}</span>
                        <input onClick={setPeriod} type="radio" data-value={value} name="radio-period" className="radio" defaultChecked={checked}/>
                    </label>
                </div>
            })
        }
    </>
    )
}

export default SelectPeriod