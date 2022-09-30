import { Footer } from './Footer/Footer';
import { Hero } from './Hero/Hero';
import { Navbar } from './Navbar/Navbar';
import React from "react"

const App = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <Footer />
        </main>
    )
}

export default App