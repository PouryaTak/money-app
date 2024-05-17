import { usePathname, useRouter, useSearchParams } from "next/navigation"

type UseRouterHandler = {
    handleSearchParams: (name: "drawer", value: string) => void
    router: ReturnType<typeof useRouter>
    pathname: string
    searchParam: ReturnType<typeof useSearchParams>
}
export default function useRouterHandler(): UseRouterHandler {
    const pathname = usePathname()
    const router = useRouter()
    const searchParam = useSearchParams()

    const handleSearchParams = (name: "drawer", value: string) => {
        router.push(pathname + "?" + name + "=" + value)
    }

    return {
        handleSearchParams,
        router,
        pathname,
        searchParam,
    }
}
