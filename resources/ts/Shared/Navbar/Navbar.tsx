import React from "react";
import { Link } from "@inertiajs/inertia-react"

export function Navbar(): JSX.Element {
    return <nav className="relative container mx-auto p-6" role="navigation" aria-label="main navigation">
        <div className="flex flex-wrap items-center justify-between">
            { /*  Logo */ }
            <a className="flex justify-center" href="">
                <img src="/images/logo.png" alt="Planet Capital Logo" className="mr-3 h-6 sm:h-10" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black"></span>
            </a>
            { /* Navigation */ }
            <div className="md:flex space-x-6 justify-between items-center ml-10 mr-auto">
                <Link href="/">Home</Link>
                <Link href="/dashboard">Dashboard</Link>
            </div>
            <a href="#" className="hidden p-3 pt-2 px-6 rounded-full bg-blue-400 text-white baseline md:flex">Login</a>
        </div>
    </nav>;
}

export default Navbar