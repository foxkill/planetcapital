//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"

interface IDescriptionProps {
    children?: React.ReactNode
}

const Description: React.FC<IDescriptionProps> = (props) => {
    return <div className="alert bg-white shadow-lg">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span style={{ whiteSpace: "pre-line" }}>{props.children}</span>
        </div>
    </div>
}

export default Description