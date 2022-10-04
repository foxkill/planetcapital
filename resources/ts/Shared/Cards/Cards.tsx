//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//
import React from "react";
import Card from "../Card";

export function Cards(props: { data: ISecurity, visible: boolean }) {
    return (
        <>
            <div className="hero min-h-[75vh] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className={`${props.visible ? '' : 'hidden'}` + " bg-base-200 p-6 gap-6 grid center lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1"}>
                        <Card key={'summary'} data={props.data ?? {}} />)
                    </div>;
                </div>
            </div>
        </>
    )
}

export default Cards