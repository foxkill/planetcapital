//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import IIncomeStatement from "@/types/income-statement";
import { AxiosResponse } from "axios";
import { get } from "./axios.get";

function fetchIncomeStatement({queryKey}): Promise<IIncomeStatement> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { symbol, exchange, periodType, limit }] = queryKey

    if (!symbol || !exchange) {
        throw new Error("Symbol and Exchange must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/income-statement/period/${periodType.toLowerCase()}/limit/${limit}`

    return get<IIncomeStatement>(endpoint)
        .then((response: AxiosResponse<IIncomeStatement>) => response.data)
        .catch((err) => {
            throw err
        })
}

export default fetchIncomeStatement