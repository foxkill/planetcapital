//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import { createContext } from "react"
import { ISecurityContext } from "@/types/security.context"

const securityContext = createContext<ISecurityContext>({} as ISecurityContext) 

export default securityContext