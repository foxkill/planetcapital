//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React, { createContext, ReactNode, useContext, useState } from "react"
import { ISecurityContext } from "@/types/security.context"
import securityContextModel from "../../models/securitycontext.model"
import useFetch from "../../useFetch"
import IInformation from "@/types/information"
import createRatiosEndpoint from "../../createRatiosEndpoint"
import fetchFinancialRatios from "../../planetapi/fetch.financialratios"
import { useQuery } from "react-query"
import ISecurity from "@/types/security"

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

    const { isLoading } = useQuery<ISecurity>(
        [
            ["ratios", context.symbol, context.exchange, context.periodType].join("-"),
            {
                symbol: context.symbol,
                exchange: context.exchange,
                period: context.periodType
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
            },
            onError: (err) => { context.information.error = err}
        }
    )


    return (<SecurityContext.Provider value={{ context, setContext }}>
        {children}
    </SecurityContext.Provider>)
}

const useSecurity = () => useContext(SecurityContext)

export { SecurityContextProvider, useSecurity }
export default SecurityContext