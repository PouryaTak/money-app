import { usePathname, useRouter } from "next/navigation"

type UseRouterHandler = {
    handleDrawerQuery: (name: string) => void
    router: any
    pathname: string
}
export default function useRouterHandler():UseRouterHandler {
    const pathname = usePathname()
    const router = useRouter()
    const handleDrawerQuery = (name: string) => {
        router.replace(pathname + "?drawer=" + name)
    }

    return {
        handleDrawerQuery,
        router,
        pathname
    }
}