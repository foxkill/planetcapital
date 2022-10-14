//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import PeriodTypes from "@/types/period";
import ISecurity from "@/types/security";
import axios, { AxiosResponse } from "axios";

function get<T, R = AxiosResponse<T>>(u: string): Promise<R> {
    return axios.get(u)
}

function fetchFinancialRatios({queryKey}): Promise<any> {
    const [_key, {symbol, exchange, period}] = queryKey

    if (!symbol || !exchange) {
       return new Promise((value) => "Symbol and Exchange must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/relative-valuation/${period.toLowerCase()}`

    return get<ISecurity>(endpoint)
        .then((response: AxiosResponse<ISecurity>) => response.data) 
        .catch((err) => {
            throw err
        })
}

export default fetchFinancialRatios