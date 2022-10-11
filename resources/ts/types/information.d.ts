//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill
// Closed Source
//

import ISecurity from "./security";
import Ticker from "./ticker";


declare interface Information {
    data: Ticker[] | ISecurity | undefined;
    loading: boolean;
    err: any;
}

export default Information