import { Dictionaries, getDictionaries } from "@/app/dictionaries";
import { cookies } from "next/dist/client/components/headers";

export default async function getTranslations() {
  const lang  = (cookies().get("language")?.value ?? "en-US") as Dictionaries
  return await getDictionaries(lang);
}
