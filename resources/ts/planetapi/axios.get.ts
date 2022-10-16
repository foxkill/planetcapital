//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import axios, { AxiosResponse } from "axios";

export function get<T, R = AxiosResponse<T>>(u: string): Promise<R> {
    return axios.get(u)
}