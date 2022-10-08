import ISecurity from "./security";

export {Ticker, Information};

declare global {
    interface Window {
        _: any;
        axios: any;
    }
}

declare interface Ticker {
    id: number;
    tikr: string;
    name: string;
    exchange_id: number;
}

declare interface Information {
    data: Ticker[]|ISecurity|undefined;
    loading: boolean;
    err: any;
}