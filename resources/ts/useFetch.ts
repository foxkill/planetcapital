import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { Ticker, Information } from './types/app'

type Resp = {
    data: Ticker[]
}

function useFetch(url: string): Information {
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    function get<T, R = AxiosResponse<T>>(u: string): Promise<R> {
        return axios.get(u)
    }

    useEffect(() => {
        console.log("im in fetch")
        get<Resp>(url)
            .then((response: AxiosResponse<Resp>) => {
                setData(response.data)
                return response.data
            })
            .catch((err) => {
                console.error(err)
                setError(err)
            })
            .then(() => {
                setLoading(false)
            })
    }, [url])

    return { data, loading, err: error }
}

export default useFetch