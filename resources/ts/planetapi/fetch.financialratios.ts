//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import IRatio from "@/types/ratio";
import { AxiosResponse } from "axios";
import { get } from "./axios.get";

function fetchFinancialRatios({ queryKey }): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { symbol, exchange, periodType, limit }] = queryKey

    if (!symbol || !exchange) {
        throw new Error("Symbol and Exchange must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/relative-valuation/${periodType.toLowerCase()}/limit/${limit}`

    return get<IRatio>(endpoint)
        .then((response: AxiosResponse<IRatio>) => response.data)
        .catch((err) => {
            throw err
        })
}

export default fetchFinancialRatios