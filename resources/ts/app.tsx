// import "./bootstrap.ts"
import React from "react";
import ReactDom from "react-dom/client"
import { createInertiaApp } from "@inertiajs/inertia-react"
import { InertiaProgress } from "@inertiajs/progress"
import { SecurityContextProvider } from "@/Shared/SecurityContext/SecurityContext";
import { QueryClientProvider } from "react-query";
import qc from "@/planetapi/queryclient"
// import { ReactQueryDevtools } from "react-query/devtools";

const appName = window.document.getElementsByName("title")[0]?.innerText || "Planet Captial"

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => import(/* @vite-ignore */ `./Pages/${name}`),
    setup({ el, App, props }) {
        ReactDom.createRoot(el).render(
            <React.StrictMode>
                <SecurityContextProvider>
                    <QueryClientProvider client={qc}>
                        <App {...props} />
                    </QueryClientProvider>
                </SecurityContextProvider>
            </React.StrictMode>
        )
    }
})

InertiaProgress.init()

// const appContainer = document.getElementById("app");

// if (appContainer) {
// ReactDom.createRoot(appContainer).render(<Layout />)
// }