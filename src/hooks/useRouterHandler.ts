import { usePathname, useRouter, useSearchParams } from "next/navigation"

type UseRouterHandler = {
    handleSearchParams: (name: string, value:string) => void
    router: any
    pathname: string,
    searchParam: any
}
export default function useRouterHandler():UseRouterHandler {
    const pathname = usePathname()
    const router = useRouter()
    const searchParam = useSearchParams()
    
    const handleSearchParams = (name: string, value: string) => {
        router.replace(pathname + "?" + name + "=" + value)
    }

    return {
        handleSearchParams,
        router,
        pathname,
        searchParam
    }
}