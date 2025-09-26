"use client"
import { createContext, useReducer } from "react"
import { addSettings, getSettings } from "@/functions/api/settings"
import { getCookie, setCookie } from "@/functions/handle-cookies"
import settingsReducer from "@/functions/setting-reducer"
import useRouterHandler from "@/hooks/useRouterHandler"
import { useMutation, useQuery } from "react-query"
import { initialSettingsState } from "@/helpers/static-data"
import { useSession } from "next-auth/react"

const cookieSetting = getCookie("settings")

export const SettingsContext = createContext<any>({})
export default function SettingsProvider({ children }: { children: React.ReactNode }) {
    const { router } = useRouterHandler()
    const { data: session, status } = useSession()

    const initialSettings =
        cookieSetting && cookieSetting !== "undefined"
            ? JSON.parse(decodeURIComponent(cookieSetting))
            : initialSettingsState
    const [settings, dispatch] = useReducer(settingsReducer, initialSettings)

    useQuery(["getSettings", session?.user?.email], () => getSettings(session?.user?.email || ""), {
        onSuccess: (data: any) => {
            dispatch({ type: "SET_SETTING", payload: data })
            setCookie("settings", encodeURIComponent(JSON.stringify(data)))
            router.refresh()
        },
        enabled: !cookieSetting && status === "authenticated",
    })

    const handleChange = (e: string, prop: string) => {
        dispatch({ type: "UPDATE_SETTING", payload: { prop, value: e } })
    }

    const { isLoading, mutate: saveSettings } = useMutation({
        mutationFn: () => addSettings(settings),
        onSuccess: () => {
            setCookie("settings", encodeURIComponent(JSON.stringify(settings)))
            router.refresh()
        },
        onError: (err) => console.log(err),
    })

    return (
        <SettingsContext.Provider value={{ settings, dispatch, handleChange, saveSettings, isLoading }}>
            {children}
        </SettingsContext.Provider>
    )
}
