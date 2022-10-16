//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import { ISecurityContext } from "@/types/security.context";

const securityContextModel: ISecurityContext = {
    endpoint: "",
    setEndPoint: () => { },
    periodType: "TTM",
    symbol: "",
    exchange: "",
    information: {
        data: null,
        error: null,
        loading: true
    },
    getQueryKey: () => {
        return "";
    },
    companyName: "",
    image: "",
    price: 0,
    changes: 0
}

export default securityContextModel