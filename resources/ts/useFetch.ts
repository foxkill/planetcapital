//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import axios, { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import IInformation from './types/information'
 
function useFetch<T>(url: string): IInformation<T> {
    const [data, setData] = useState<T|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    function get<T, R = AxiosResponse<T>>(u: string): Promise<R> {
        return axios.get(u)
    }

    useEffect(() => {
        console.log("im in fetch", url)
        setError(null)
        if (!url) {
            return
        }
        get<T>(url)
            .then((response: AxiosResponse<T>) => {
                const { data } = response
                return data
            })
            .then((d: T) => {
                setData(d)
            })
            .catch((err) => {
                setError(err)
            })
            .then(() => {
                setLoading(false)
            })
    }, [url])

    return { data, loading, error: error }
}

export default useFetch