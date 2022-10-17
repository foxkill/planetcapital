//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { ReactNode } from 'react'
import { useSecurity } from '../SecurityContext/SecurityContext'

interface ICompanyInfoProps {
    children: ReactNode
}

function CompanyInfo(props: ICompanyInfoProps): JSX.Element {
    const ctx = useSecurity()
    const { image, symbol, exchange, price, changes } = ctx.context
    // const imageUrl = (ctx.context.information.loading) ? <Spinner></Spinner> : image
    const color = changes < 0 ? { color: 'red' } : { color: 'green' }

    function toPercentage(price: number, change: number): number {
        const oldPrice = price - change
        return (change / oldPrice) * 100
    }

    const percentageChange = toPercentage(price, changes).toPrecision(3)

    const sign = changes > 0 ? '+' : ''

    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring-1 ring-slate-400 ring-offset-base-100 ring-offset-4">
                            {
                                !ctx.context.information.loading &&
                                <img src={image} />
                            }
                        </div>
                    </div>
                </div>
                <div className="stat-value">{props.children}</div>
                <div className="stat-title">{exchange.toUpperCase() + ":" + symbol.toUpperCase()}</div>
                <div className="stat-desc">{price + " USD "}<span style={color}>{sign + changes.toPrecision(3) + " USD "}({sign + percentageChange}%)</span></div>
            </div>
        </div>
    )
}

export default CompanyInfo