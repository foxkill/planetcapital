//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import PeriodTypes from "./period"
import IInformation from "./information"
import IRatio from "./ratio"
import IRatioTTM from "./ratio.ttm"
import { IProfile } from "./profile"

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
    symbol: string
    companyName: string
    image: string,
    price: number
    changes: number,
    exchange: string
    information: IInformation<IRatio>
    setContext?: (value: ISecurityContext) => void
    getQueryKey: () => string
}