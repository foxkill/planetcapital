//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"
import React from "react"
import { Head } from "@inertiajs/inertia-react"

function Dashboard(): JSX.Element {
    return <Layout>
        <Head title="Dashboard"></Head>
        <Hero>Hallo, ich bin dein Dashboard !</Hero>
    </Layout>
}

export default Dashboard