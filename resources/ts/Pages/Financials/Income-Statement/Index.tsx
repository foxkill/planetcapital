//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import CompanyInfo from "@/Shared/CompanyInfo"
import Hero from "@/Shared/Hero"
import Layout from "@/Shared/Layout"

const Index: React.FC = () => {
    return (
        <Layout>
            <Hero height={30}><CompanyInfo /></Hero>
            <Hero>Income Statement</Hero>
        </Layout>
    )
}

export default Index