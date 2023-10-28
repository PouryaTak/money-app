import { Dictionaries, getDictionaries } from "@/app/dictionaries"
import { cookies } from "next/dist/client/components/headers"

export default async function getTranslations() {
  const settings = JSON.parse(cookies().get("settings")?.value || '{}')
    const lang = (settings.lang || "en-US") as Dictionaries
    return await getDictionaries(lang)
}
