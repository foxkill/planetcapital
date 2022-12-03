//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { AxiosResponse } from "axios";
import { get } from "./axios.get";

function fetchBalanceSheetStatement({queryKey}): Promise<IBalanceSheetStatement[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { symbol, exchange, periodType, limit }] = queryKey

    if (!symbol || !exchange) {
        throw new Error("Symbol and Exchange must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/balance-sheet/period/${periodType.toLowerCase()}/limit/${limit}`

    return get<IBalanceSheetStatement[]>(endpoint)
        .then((response: AxiosResponse<IBalanceSheetStatement[]>) => response.data)
        .catch((err) => {
            throw err
        })
}

export default fetchBalanceSheetStatement