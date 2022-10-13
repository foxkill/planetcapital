//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import PeriodTypes from "./period"
import IInformation from "./information"

// export declare type SetEndPointFunc = (endpoint: string) => void
export declare type SetStringValueFunc = (value: string) => void
export declare type SetContextFunc = (value: ISecurityContext) => void
//
// Security Context Data
//
export declare interface ISecurityContext  {
    endpoint: string
    setEndPoint: SetStringValueFunc
    periodType: PeriodTypes
    setContext?: (value: ISecurityContext) => void
    information: IInformation
}