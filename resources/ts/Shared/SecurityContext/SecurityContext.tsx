//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React, { createContext, ReactNode, useContext, useState } from "react"
import { ISecurityContext } from "@/types/security.context"
import securityContextModel from "@/models/securitycontext.model"
import fetchFinancialRatios from "@/planetapi/fetch.financialratios"
import { useQuery } from "react-query"
import IRatio from "@/types/ratio"
import { IProfile } from "@/types/profile"
import fetchProfile from "@/planetapi/fetch.profile"

interface ISecurityContextContainer {
    context: ISecurityContext
    // setEndPoint: React.Dispatch<React.SetStateAction<string>>
    setContext: React.Dispatch<React.SetStateAction<ISecurityContext>>
}

interface ISecurityContextProps {
    children: ReactNode
    // setEndPoint: React.Dispatch<React.SetStateAction<string>>
}

const SecurityContext = createContext<ISecurityContextContainer>({} as ISecurityContextContainer)

function SecurityContextProvider({ children }: ISecurityContextProps): JSX.Element {
    const [context, setContext] = useState<ISecurityContext>(securityContextModel)

    const { isLoading } = useQuery<IRatio>(
        [
            ["ratios", context.symbol, context.exchange, context.periodType].join("-"),
            {
                symbol: context.symbol,
                exchange: context.exchange,
                periodType: context.periodType
            }
        ],
        fetchFinancialRatios as any,
        {
            enabled: Boolean(context.symbol && context.exchange),
            retry: false,
            onSuccess: (data) => { 
                console.log("set data");
                
                context.information.data = data 
                context.information.error = null
                context.information.loading = false
            },
            onError: (err) => { 
                context.information.data = null
                context.information.error = err
                context.information.loading = false
            }
        }
    )

    useQuery<IProfile>(
        [
            ["profile", context.symbol, context.exchange].join("-"),
            { symbol: context.symbol, exchange: context.exchange}
        ],
        fetchProfile,
        {
            enabled: Boolean(context.symbol && context.exchange),
            retry: false,
            onSuccess: (data: IProfile) => { 
                // console.log("set company name");
                context.companyName = data.companyName
                context.image = data.image
                context.price = data.price
                context.changes = data.changes
            },
        }
    )

    context.information.loading = isLoading

    return (<SecurityContext.Provider value={{ context, setContext }}>
        {children}
    </SecurityContext.Provider>)
}
//
// Helper function for accessing the context.
//
const useSecurity = (): ISecurityContextContainer => useContext(SecurityContext)

export { SecurityContextProvider, useSecurity }
export default SecurityContext