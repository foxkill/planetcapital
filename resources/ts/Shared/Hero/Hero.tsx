import { TickerSearch } from '../TickerSearch/TickerSearch';
import React, { useContext } from "react";
import securityContext from '../SecurityContext';


export function Hero(props: {reducedHeight: boolean}): JSX.Element {
    return (
        <>
            <div className={
                "hero bg-base-200 " + (props.reducedHeight ? "min-h-[60vh]" : "min-h-screen")
                }>
                <div className="hero-content flex-col lg:flex-row-reverse lg:gap-16">
                    <TickerSearch />
                </div>
            </div>
        </>
    )
}

export default Hero