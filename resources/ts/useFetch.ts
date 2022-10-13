import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import IInformation from './types/information'
import ISecurity from './types/security'
import Ticker from './types/ticker'
 
function useFetch(url: string): IInformation {
    const [data, setData] = useState<Ticker[] | ISecurity | undefined>()
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
        get<Ticker[]>(url)
            .then((response: AxiosResponse<Ticker[]>) => {
                const { data } = response
                return data
            })
            .then((d: Ticker[]) => {
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