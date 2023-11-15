import { getCookie } from "@/functions/handle-cookies"

const baseUrl = process.env.NEXT_PUBLIC_BASE_API

const token = typeof window !== "undefined" && getCookie("token")

const initialConfig = {
    headers: {
        "Content-Type": "application/json",
        authorization: token || "",
    },
}

const errorHandler = (error: any) => {}

const fetcher = async (url: string, config: any) => {
    return fetch(baseUrl + url, config)
        .then((res) => res.json())
        .catch((err) => errorHandler(err))
}

export const apiClient = {
    Get: (url: string, config: any = initialConfig) => fetcher(url, config),
    Post: (url: string, data: any, config: any = initialConfig) => {
        config.method = "POST"
        config.body = JSON.stringify(data)
        return fetcher(url, config)
    },
    Put: (url: string, data: any, config: any = initialConfig) => {
        config.method = "PUT"
        config.body = JSON.stringify(data)
        return fetcher(url, config)
    },
    Delete: (url: string, config: any = initialConfig) => {
        config.method = "DELETE"
        return fetcher(url, config)
    },
}
