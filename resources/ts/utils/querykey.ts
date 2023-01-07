//
// Licence
// Copyright (c) 2009-2023 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { ISecurityContext } from "@/types/security.context"

function getQueryKey(key: string, limit: number, context: ISecurityContext): string {
    const queryKey = [key, context.symbol, context.exchange, context.periodType, limit].join("-").toLowerCase()

    // TOD: remove debug code.
    // console.log(queryKey)

    return queryKey
}

export default getQueryKey