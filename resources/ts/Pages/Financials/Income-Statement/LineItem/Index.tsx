//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import fetchIncomeStatement from "@/planetapi/fetch.income-statement"
import fetchProfile from "@/planetapi/fetch.profile"
import { LineItemChart } from "@/Shared/Charts"
import CompanyInfo from "@/Shared/CompanyInfo"
import Hero from "@/Shared/Hero"
import HugeHeader from "@/Shared/HugeHeader"
import InfoCard from "@/Shared/InfoCard"
import Layout from "@/Shared/Layout"
import { useSecurity } from "@/Shared/SecurityContext/SecurityContext"
import SelectPeriod from "@/Shared/SelectPeriod/SelectPeriod"
import Spinner from "@/Shared/Spinner"
import { LineItemAverageKind, StatementCardAverage } from "@/Shared/StatementCard"
import IIncomeStatement from "@/types/income-statement"
import { IProfile } from "@/types/profile"
import getPeriodTypeMap from "@/utils/periodtypemap"
import { Link } from "@inertiajs/inertia-react"
import React from "react"
import { usePalette } from "react-palette"
import { useQuery } from "react-query"
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

function toDataKey(lineitem: string): string {
    const li = lineitem.split("-").map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
    }).join("")

    return li.charAt(0).toLowerCase() + li.slice(1)
}

interface ILineItemProps {
    symbol: string
    exchange: string
    lineitem: string
}

interface IPage<P extends ILineItemProps> extends React.FC<P> {
    layout?: (page: React.ReactNode) => JSX.Element
}

//
// Financials - Income-Statement - LineItem
//
const LineItem: IPage<ILineItemProps> = (props) => {
    // eslint-disable-next-line react/prop-types
    const { symbol, exchange, lineitem } = props

    // const companyName = useSecurity().context.companyName
    const period = useSecurity().context.periodType
    const dataKey = toDataKey(lineitem)
    let limit = (period != "FY") ? 40 : 10

    const { data } = usePalette(`/api/security/${exchange}/${symbol}/image`)

    const periodTypeMap = getPeriodTypeMap()

    const incomeStatementQueryKey = [symbol, exchange, period, limit].join("-").toLowerCase()
    const incomeStatementQuery = useQuery<IIncomeStatement[]>(
        [incomeStatementQueryKey, { exchange, symbol, periodType: period, limit }],
        fetchIncomeStatement,
        {
            enabled: Boolean(symbol && exchange),
            retry: false,
        }
    )

    const profileQueryKey = ["profile", symbol, exchange].join("-").toLowerCase()
    const profileQuery = useQuery<IProfile>(
        [
            profileQueryKey,
            { symbol, exchange }
        ],
        fetchProfile,
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
                        <li><Link href={route("security.financials.incomestatement", { exchange, symbol })}>Income Statement</Link></li>
                        <li>{toLineItem(lineitem)}</li>
                    </ul>
                </div>
            </Hero>
            <Hero onTop>
                <HugeHeader color="text-slate-500" bold={false} padding={0}>{profileQuery.data?.companyName}</HugeHeader>
                <HugeHeader>{toLineItem(lineitem)}</HugeHeader>
                <CompanyInfo />
                <SelectPeriod />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {incomeStatementQuery.isLoading ?
                        (
                            <div className="text-center w-full lg:col-span-4 md:colspan-3">
                                <Spinner width={24} height={24}></Spinner>
                            </div>
                        ) :
                        (incomeStatementQuery.isFetched &&
                            <>
                                <StatementCardAverage
                                    lineitem={dataKey}
                                    data={incomeStatementQuery.data!}
                                    mode={LineItemAverageKind.LAST_YEARS_VALUE} />
                                <StatementCardAverage
                                    lineitem={dataKey}
                                    data={incomeStatementQuery.data!}
                                    mode={LineItemAverageKind.THREE_YEARS_CAGR_VALUE} />
                                <StatementCardAverage
                                    lineitem={dataKey}
                                    data={incomeStatementQuery.data!}
                                    mode={LineItemAverageKind.THREE_YEARS_AVG_VALUE} />
                                <InfoCard
                                    colSpan={"col-span-1 lg:col-span-3"}
                                    header={toLineItem(lineitem) + " (" + periodTypeMap[period] + ")"}
                                    subheader={profileQuery.data?.companyName || ""}
                                    image={`/api/security/${profileQuery.data?.exchangeShortName.toLowerCase()}/${profileQuery.data?.symbol.toLowerCase()}/image`}>
                                    <div className="h-96 w-full">
                                        <LineItemChart
                                            periodType={period}
                                            incomeStatements={incomeStatementQuery.data!}
                                            lineitem={dataKey}
                                            palette={data}
                                        >{toLineItem(lineitem)}</LineItemChart>
                                    </div>
                                </InfoCard>
                            </>
                        )
                    }
                </div>
            </Hero>
        </>
    )
}

LineItem.layout = (page: React.ReactNode): JSX.Element => <Layout>{page}</Layout>
export default LineItem