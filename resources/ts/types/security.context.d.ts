//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import ISecurityTTM from "./security.ttm"
import ISecurity from "./security"
import Ticker from "./ticker"
import IPeriodType from "./period"

export declare type SetEndPointFunc = (endpoint: string) => void

//
// Security Context Data
//
export declare interface ISecurityContext  {
    setEndPoint: SetEndPointFunc
    endpoint: string
    endpointType: IPeriodType
    data: Ticker[] | ISecurity | ISecurityTTM | undefined
    error: any
}