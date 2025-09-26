import { Dictionaries, getDictionaries } from "@/app/dictionaries"
import { cookies } from "next/dist/client/components/headers"

export default async function getTranslations() {
    const cookieStore = cookies().get("settings")?.value
    const cookieSettings = cookieStore && cookieStore !== "undefined" ? cookieStore : "{}"
    const settings = JSON.parse(cookieSettings)
    const lang = (settings.lang || "en-US") as Dictionaries
    return await getDictionaries(lang)
}
