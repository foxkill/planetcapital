//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React from "react"

interface IHugeHeaderProperties {
    bold?: boolean
    padding?: number    
    color?: string
    children: React.ReactNode
}
// function HugeHeader({ props }: { children: React.ReactNode }): JSX.Element {

const HugeHeader: React.FC<IHugeHeaderProperties> = (props) => {
    const padding = props.padding ?? 4
    const bold = props.bold ?? true
    const color = props.color ?? ""
    return (
        <div className={`pb-${padding} text-center`}>
            <h1 className={`uppercase text-4xl ${bold ? "font-bold" : ""}${color ? " " + color : ""}`}>{props.children}</h1>
        </div>
    )
}

export default HugeHeader