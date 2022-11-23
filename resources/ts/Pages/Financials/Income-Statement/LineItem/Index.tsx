//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"
import HugeHeader from "@/Shared/HugeHeader"
import CompanyInfo from "@/Shared/CompanyInfo"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import { Link } from "@inertiajs/inertia-react"
/*
import { FunctionComponent, PropsWithChildren } from 'react';

interface Props {
  label: string;
}

export const MyComponent: FunctionComponent<PropsWithChildren<Props>> =
  ({ label, children }) => <div>{label}: {children}</div>;

Or even better:

import { FunctionComponent, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  label: string;
}

export const MyComponent: FunctionComponent<Props> =
  ({ label, children }) => <div>{label}: {children}</div>;
*/

function toLineItem(lineitem: string): string {
    return lineitem.split("-").map((item) => item.toLocaleUpperCase()).join(" ")
}

interface ILineItemProps {
    symbol: string
    exchange: string
    lineitem: string
}

interface IPage<P extends ILineItemProps> extends React.FC<P> {
    layout?: (page: React.ReactNode) => JSX.Element
}

const LineItem: IPage<ILineItemProps> = (props) => {
    // eslint-disable-next-line react/prop-types
    const { symbol, exchange, lineitem } = props

    return (
        <>
            <Hero height={20}>
                <div className="text-sm breadcrumbs">
                    <ul>
                        {/* Goes to summary */}
                        <li><a>{
                            // eslint-disable-next-line react/prop-types
                            symbol.toUpperCase()
                        }</a></li>
                        { /* Goes to parent */}
                        <li><Link href={route("security.financials.incomestatement", { exchange, symbol })}>Financials</Link></li>
                        <li><Link href={route("security.financials.incomestatement", { exchange, symbol })}>Income Statement</Link></li>
                        <li>{toLineItem(lineitem)}</li>
                    </ul>
                </div>
            </Hero>

            <Hero>
                <h1>{symbol}</h1>
                <HugeHeader>{toLineItem(lineitem)}</HugeHeader>
                <CompanyInfo></CompanyInfo>
                <SelectPeriod></SelectPeriod>
            </Hero>
        </>
    )
}

LineItem.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default LineItem