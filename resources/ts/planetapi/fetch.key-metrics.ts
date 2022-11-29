//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { IKeyMetric } from "@/types/key-metric";
import { AxiosResponse } from "axios";
import { get } from "./axios.get";

function fetchKeyMetrics({ queryKey }): Promise<IKeyMetric[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { symbol, exchange, periodType, limit }] = queryKey

    if (!symbol || !exchange || !limit || !periodType) {
        throw new Error("The symbol, the exchange and a limit must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/profitability/period/${periodType.toLowerCase()}/limit/${limit}`

    return get<IKeyMetric[]>(endpoint)
        .then((response: AxiosResponse<IKeyMetric[]>) => response.data)
        .catch((err) => {
            throw err
        })
}

export default fetchKeyMetrics