import React from "react"
import Section from "./Section"

const App = (props) => {
    return (
        <div className="App">
            <h1>Hello new component</h1>
           {props.children} 
        </div>
    )
}

export default App