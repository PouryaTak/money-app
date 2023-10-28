"use client"
import { createContext, useState } from "react"
import { addSettings } from "@/functions/api/settings"
import { getCookie, setCookie } from "@/functions/handle-cookies"
import { useRouter } from "next/navigation"

const initialState = {
    lang: "en-US",
    calender: "gregorian",
    currency: "$",
}

export type Settings = typeof initialState
const cookieSetting = getCookie("settings")
const initialSettings = cookieSetting ? JSON.parse(decodeURIComponent(cookieSetting)) : initialState

export const SettingsContext = createContext<any>({})
export default function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>(initialSettings)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleChange = (e: string, prop: string) => {
        if (prop === "currency" && e === "custom") {
            e = ""
        }
        setSettings((val) => {
            const valClone = JSON.parse(JSON.stringify(val))
            valClone[prop] = e
            return valClone
        })
    }

    const saveSettings = () => {
        setIsLoading(true)
        addSettings(settings)
            .then((res) => {
                setCookie("settings", encodeURIComponent(JSON.stringify(settings)))
                router.refresh()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }

    return (
        <SettingsContext.Provider value={{ settings, setSettings, handleChange, saveSettings, isLoading }}>
            {children}
        </SettingsContext.Provider>
    )
}
