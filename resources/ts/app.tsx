// import "./bootstrap.ts"
import ReactDom from "react-dom/client"
import React from "react";
import Layout from "./Shared/Layout";
import { createInertiaApp } from "@inertiajs/inertia-react"

createInertiaApp({
    resolve: (name) => import(`./Pages/${name}`),
    setup({ el, App, props }) {
        console.log(props);
        
        // console.log(el, App, props)
        ReactDom.createRoot(el).render(<Layout />)
    }
})

// const appContainer = document.getElementById("app");

// if (appContainer) {
// ReactDom.createRoot(appContainer).render(<Layout />)
// }