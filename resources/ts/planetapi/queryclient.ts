//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import { QueryClient } from "react-query"

export default new QueryClient({
    defaultOptions: {
        queries: {
            // Other query settings.
            refetchOnWindowFocus: false,
        },
    },
})