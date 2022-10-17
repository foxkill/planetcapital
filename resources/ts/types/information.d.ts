//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill
// Closed Source
//

declare interface IInformation<T> {
    data: T | null;
    loading: boolean;
    error: any;
}

export default IInformation