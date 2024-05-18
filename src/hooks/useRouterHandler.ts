import { Contents } from "@/components/drawer-contents"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type DrawerContents = keyof Contents
type SearchParamValue = string | DrawerContents
type SearchParamName = "date" | "drawer"

type UseRouterHandler = {
    handleSearchParams: (name: SearchParamName, value: SearchParamValue) => void
    router: ReturnType<typeof useRouter>
    pathname: string
    searchParam: ReturnType<typeof useSearchParams>
}
export default function useRouterHandler(): UseRouterHandler {
    const pathname = usePathname()
    const router = useRouter()
    const searchParam = useSearchParams()

    const handleSearchParams = (name: SearchParamName, value: SearchParamValue) => {
        router.push(pathname + "?" + name + "=" + value)
    }

    return {
        handleSearchParams,
        router,
        pathname,
        searchParam,
    }
}
