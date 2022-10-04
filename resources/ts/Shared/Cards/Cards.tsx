//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React from "react";
import Card from "../Card";

export function Cards(props: {count: number, visible: boolean}) {
    const xcards: number[] = [];

    for (let i = 0; i < props.count; i++) {
        xcards.push(i) 
    }

    return <div className={`${props.visible ? '' : 'hidden'}` + " bg-base-200 p-6 gap-6 grid center lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1"}>
        {xcards.map(i => <Card key={i} text={"Ich bin Nummber: " + i} />)}
    </div>;
}

export default Cards