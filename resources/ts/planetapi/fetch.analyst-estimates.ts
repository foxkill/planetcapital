//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import IAnalystEstimate from "@/types/analyst-estimates"
import { AxiosResponse } from "axios"
import { get } from "./axios.get"

function fetchAnalystEstimates({ queryKey }): Promise<IAnalystEstimate[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { symbol, exchange, periodType, limit }] = queryKey

    if (!symbol || !exchange) {
        throw new Error("Symbol and Exchange must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/analyst-estimates/${periodType.toLowerCase()}/limit/${limit}`

    return get<IAnalystEstimate[]>(endpoint)
        .then((response: AxiosResponse<IAnalystEstimate[]>) => response.data)
        .catch((err) => {
            throw err
        })
}

export default fetchAnalystEstimates