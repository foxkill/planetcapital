//
// Copyright (c) 2022, Stefan Martin
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