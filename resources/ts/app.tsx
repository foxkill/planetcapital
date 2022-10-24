// import "./bootstrap.ts"
import ReactDom from "react-dom/client"
import React from "react";
import { createInertiaApp } from "@inertiajs/inertia-react"
import { InertiaProgress } from "@inertiajs/progress"
import qc from "@/planetapi/queryclient"
import { SecurityContextProvider } from "@/Shared/SecurityContext/SecurityContext";
import { QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

createInertiaApp({
    resolve: (name) => import(/* @vite-ignore */ `./Pages/${name}`),
    setup({ el, App, props }) {
        ReactDom.createRoot(el).render(
            <QueryClientProvider client={qc}>
                <SecurityContextProvider>
                    <App {...props} />
                </SecurityContextProvider>
            </QueryClientProvider>
        )
    }
})

InertiaProgress.init()

// const appContainer = document.getElementById("app");

// if (appContainer) {
// ReactDom.createRoot(appContainer).render(<Layout />)
// }