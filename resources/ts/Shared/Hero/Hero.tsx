import { TickerSearch } from '../TickerSearch/TickerSearch';
import React, { useContext } from "react";
import SecurityContext from '../SecurityContext';

export function Hero() {
    const { setEndPoint } = useContext(SecurityContext);
    return (
        <>
            <div className="hero min-h-[75vh] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <TickerSearch setEndPoint={setEndPoint}/>
                </div>
            </div>
        </>
    )
}

export default Hero