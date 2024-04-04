import { getCookie, removeCookies } from "@/functions/handle-cookies"
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"

const baseUrl = process.env.NEXT_PUBLIC_BASE_API

const token = typeof window !== "undefined" && getCookie("token")

const initialConfig = {
    headers: {
        "Content-Type": "application/json",
        authorization: token || "",
    },
}

const errorHandler = (error: any) => {
    toast.error(error.message || 'Something went wrong');
    if(error.status === 403){
        removeCookies()
        signOut()
    }
    throw new Error('something happened')
}

const fetcher = async (url: string, config: any, showToast: boolean = true) => {
    try {
        const response = await fetch(baseUrl + url, config)
        if (!response.ok) {
            errorHandler(response)
        }
        const data = await response.json()
        if(showToast && data.message) toast.success(data.message);
        return data
    } catch (err) {
        console.log(err)
    }
}

export const apiClient = {
    Get: (url: string) => fetcher(url, {}),
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
