import { Contents } from "@/components/drawer-contents"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type DrawerContents = keyof Contents

type UseRouterHandler = {
    handleSearchParams: (name: "drawer", value: DrawerContents) => void
    router: ReturnType<typeof useRouter>
    pathname: string
    searchParam: ReturnType<typeof useSearchParams>
}
export default function useRouterHandler(): UseRouterHandler {
    const pathname = usePathname()
    const router = useRouter()
    const searchParam = useSearchParams()

    const handleSearchParams = (name: "drawer", value: DrawerContents) => {
        router.push(pathname + "?" + name + "=" + value)
    }

    return {
        handleSearchParams,
        router,
        pathname,
        searchParam,
    }
}
