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
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import { LineItemAverageKind, StatementCardAverage } from "@/Shared/StatementCard"
import { useQuery } from "react-query"
import IIncomeStatement from "@/types/income-statement"
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import Spinner from "@/Shared/Spinner"
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

    const companyName = useSecurity().context.companyName
    const period = useSecurity().context.periodType
    const limit = 10

    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [[symbol, exchange, period, limit].join("-"), { exchange, symbol, period, limit }],
        fetchIncomeStatement as any,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )
    
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
                        {/* <li><Link href={route("security.financials.incomestatement", { exchange, symbol })}>Financials</Link></li> */}
                        <li><Link href={route("security.financials.incomestatement", { exchange, symbol })}>Income Statement</Link></li>
                        <li>{toLineItem(lineitem)}</li>
                    </ul>
                </div>
            </Hero>
            <Hero onTop>
                <HugeHeader color="text-slate-500" bold={false} padding={0}>{companyName}</HugeHeader>
                <HugeHeader>{toLineItem(lineitem)}</HugeHeader>
                <CompanyInfo />
                <SelectPeriod />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {incomeStatementQuery.isLoading ?
                        (
                            <div className="text-center w-full lg:col-span-4 md:colspan-3">
                                <Spinner></Spinner>
                            </div>
                        ) :
                        (incomeStatementQuery.isFetched &&
                            <>
                                <StatementCardAverage
                                    lineitem="revenue"
                                    data={incomeStatementQuery.data!}
                                    mode={LineItemAverageKind.LAST_YEARS_VALUE} />
                                <StatementCardAverage
                                    lineitem="revenue"
                                    data={incomeStatementQuery.data!}
                                    mode={LineItemAverageKind.THREE_YEARS_CAGR_VALUE} />
                                <StatementCardAverage
                                    lineitem="revenue"
                                    data={incomeStatementQuery.data!}
                                    mode={LineItemAverageKind.THREE_YEARS_AVG_VALUE} />
                            </>)
                    }
                </div>
            </Hero>
        </>
    )
}

LineItem.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default LineItem