import React, { useState } from "react";
import { Link, InertiaLink, usePage } from "@inertiajs/inertia-react"
import { useSecurity } from "../SecurityContext/SecurityContext";

export function Navbar(): JSX.Element {
    const ctx = useSecurity()
    const { symbol, exchange } = ctx.context
    

    return <div className="navbar bg-base-100">
        <div className="navbar-start w-24">
            <div className="dropdown lg:hidden md:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                {/* <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href="/">Home</Link></li>
                    <li><InertiaLink href={exchange + "/" + symbol + "/relative-valuation"}>Relative Valuation</InertiaLink></li>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                </ul> */}
            </div>
            <a className="btn btn-ghost btn-circle">
                <img src="/images/logo.png" alt="Planet Capital Logo" className="h-5 w-5" />
            </a>
        </div>
        <div className="flex-1">
            <ul className="menu menu-horizontal">
                <li><Link href="/">Home</Link></li>
                {Boolean(symbol && exchange) && (
                    <>
                        <li><Link href={route("security.relative.valuation", { symbol, exchange })}>Relative Valuation</Link></li>
                        <li><Link href={route("security.financials.incomestatement", { symbol, exchange })}>Income Statement</Link></li>
                    </>)
                }
                <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
        </div>
        <div className="navbar-end">
            <a className="btn mr-3">Login</a>
        </div>
        {/* <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div> */}
        {/* <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </button>
        </div> */}
    </div>
    // return <nav className="relative container mx-auto p-6" role="navigation" aria-label="main navigation">
    //     <div className="flex flex-wrap items-center justify-between">
    //         { /*  Logo */ }
    //         <a className="flex justify-center" href="">
    //             <img src="/images/logo.png" alt="Planet Capital Logo" className="mr-3 h-6 sm:h-10" />
    //             <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black"></span>
    //         </a>
    //         { /* Navigation */ }
    //         <div className="md:flex space-x-6 justify-between items-center ml-10 mr-auto">
    //             <Link href="/">Home</Link>
    //             <Link href="/dashboard">Dashboard</Link>
    //         </div>
    //         <a href="#" className="hidden p-3 pt-2 px-6 rounded-full bg-blue-400 text-white baseline md:flex">Login</a>
    //     </div>
    // </nav>;
}

export default Navbar