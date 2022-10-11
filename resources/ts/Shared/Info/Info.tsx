//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/\var\www\html
// Closed Source
//

import React from 'react';

const Info = (props: { message: string, position?: string }) => {
    return <div className={`toast toast-${props.position ? props.position : 'top'}`}>
        <div className="alert alert-info">
            <div>
                <span>{props.message}</span>
            </div>
        </div>
    </div>
}

export default Info