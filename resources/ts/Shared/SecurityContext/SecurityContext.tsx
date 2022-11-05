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