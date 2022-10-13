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
    information: { 
        data: undefined,
        error: undefined,
        loading: true
    }
}

export default securityContextModel