//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill
// Closed Source
//

import ISecurity from "./security";
import Ticker from "./ticker";


declare interface IInformation {
    data: Ticker[] | ISecurity | undefined;
    loading: boolean;
    error: any;
}

export default IInformation