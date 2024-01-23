import { getCookie, removeCookies } from "@/functions/handle-cookies"
import { signOut } from "next-auth/react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_API

const token = typeof window !== "undefined" && getCookie("token")

const initialConfig = {
    headers: {
        "Content-Type": "application/json",
        authorization: token || "",
    },
}

const errorHandler = (error: any) => {
    // call notification error here

    if(error.status === 403){
        removeCookies()
        signOut()
    }
    return {data:[]}
}

const fetcher = async (url: string, config: any) => {
    try {
        const response = await fetch(baseUrl + url, config)
        if (!response.ok) {
            errorHandler(response)
        }
        return await response.json()
    } catch (err) {
        console.log(err)
    }
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
