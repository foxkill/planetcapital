//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
export {}

declare global {
    function route(name: string): string
    function route(name: string, routeParams: object): string
}