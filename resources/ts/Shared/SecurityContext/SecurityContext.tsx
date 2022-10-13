//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React, { createContext, ReactNode, useContext, useState } from "react"
import { ISecurityContext } from "@/types/security.context"
import securityContextModel from "../../Models/securitycontext.model"
import useFetch from "../../useFetch"
import IInformation from "@/types/information"

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

function SecurityContextProvider({children}: ISecurityContextProps): JSX.Element {
    const [context, setContext] = useState<ISecurityContext>(securityContextModel)
    const info = useFetch(context.endpoint) as IInformation
    
    context.information = info

    return (<SecurityContext.Provider value={{context, setContext}}>
        {children}
    </SecurityContext.Provider>)
}

const useSecurity = () => useContext(SecurityContext)

export {SecurityContextProvider, useSecurity}
export default SecurityContext