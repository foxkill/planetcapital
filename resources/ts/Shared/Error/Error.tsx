//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"

interface IErrorProps  {
    children: React.ReactNode
    error: any
}

const Error: React.FC<IErrorProps> = (props): JSX.Element | null => {
    const {children, error} = props

    if (!error) {
        return null
    }

    let msg = children

    if (error.response) {
        try {
            // console.log(error.response.data);
            msg = JSON.parse(error.response.data.message)
        } catch (error) {
            // do nothing
        }
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        //  console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        if (!msg) {
            msg = error.message
        }
        // console.log('Error', error.message);
    }
    return (
        <div className="alert alert-error shadow-lg mb-6 flex">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{msg}</span>
            </div>
        </div>
    )
}

export default Error