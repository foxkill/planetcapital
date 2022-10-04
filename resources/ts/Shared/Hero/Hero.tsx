import { TickerSearch } from '../TickerSearch/TickerSearch';
import { Cards } from '../Cards/Cards';
import React, { useEffect, useRef, useState } from "react";
import Tickerlist from "../Tickerlist";
import useFetch from '../../useFetch';

export function Hero(props: { showCards: boolean }) {
    return (
        <>
            <div className="hero min-h-[75vh] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <TickerSearch />
                </div>
            </div>
        </>
    )
}

export default Hero