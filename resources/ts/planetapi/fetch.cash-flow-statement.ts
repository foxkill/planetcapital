//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import ICashflowStatement from "@/types/cashflow-statement";
import { AxiosResponse } from "axios";
import { get } from "./axios.get";

function fetchCashFlowStatement({queryKey}): Promise<ICashflowStatement[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { symbol, exchange, periodType, limit }] = queryKey

    if (!symbol || !exchange) {
        throw new Error("Symbol and Exchange must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/cash-flow-statement/period/${periodType.toLowerCase()}/limit/${limit}`

    return get<ICashflowStatement[]>(endpoint)
        .then((response: AxiosResponse<ICashflowStatement[]>) => response.data)
        .catch((err) => {
            throw err
        })
}

export default fetchCashFlowStatement