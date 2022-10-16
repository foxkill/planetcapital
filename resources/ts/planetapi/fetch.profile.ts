
//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { IProfile } from "@/types/profile";
import { AxiosResponse } from "axios";
import { get } from "./axios.get";

function fetchProfile({queryKey}): Promise<IProfile> {
    const [_, {symbol, exchange}] = queryKey

    if (!symbol || !exchange) {
       throw new Error("Symbol and Exchange must be given")
    }

    const endpoint = `/api/security/${exchange.toLowerCase()}/${symbol.toLowerCase()}/profile`

    return get<IProfile>(endpoint)
        .then((response: AxiosResponse<IProfile>) => response.data) 
        .catch((err) => {
            throw err
        })
}

export default fetchProfile