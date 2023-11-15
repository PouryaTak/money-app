"use client"
import { createContext, useReducer, useState } from "react"
import { addSettings } from "@/functions/api/settings"
import { getCookie, setCookie } from "@/functions/handle-cookies"
import { useRouter } from "next/navigation"
import { Settings } from "@/types/settings"
import { initialSettingsState } from "@/helpers/static-data"
import settingsReducer from "@/functions/setting-reducer"


const cookieSetting = getCookie("settings")
const initialSettings = cookieSetting ? JSON.parse(decodeURIComponent(cookieSetting)) : initialSettingsState

export const SettingsContext = createContext<any>({})
export default function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

    const handleChange = (e: string, prop: string) => {
      dispatch({ type: 'UPDATE_SETTING', payload: { prop, value: e } });
    };

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
        <SettingsContext.Provider value={{ settings, dispatch, handleChange, saveSettings, isLoading }}>
            {children}
        </SettingsContext.Provider>
    )
}
