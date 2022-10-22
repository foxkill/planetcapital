// import "./bootstrap.ts"
import ReactDom from "react-dom/client"
import React from "react";
import { createInertiaApp } from "@inertiajs/inertia-react"
import { InertiaProgress } from "@inertiajs/progress"

createInertiaApp({
    resolve: (name) => import(/* @vite-ignore */ `./Pages/${name}`),
    setup({ el, App, props }) {
        ReactDom.createRoot(el).render(<App {...props} />)
    }
})

InertiaProgress.init()

// const appContainer = document.getElementById("app");

// if (appContainer) {
// ReactDom.createRoot(appContainer).render(<Layout />)
// }