import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

function AutoVerify({ verifyCode, user }) {
    const [params] = useSearchParams()

    const code = useMemo(() => params.get('code'), [params])
    const method = useMemo(() => params.get('method'), [params])

    useEffect(() => {
        if (code && method === 'auto') {
            if (user?.role) {
                verifyCode({ code })
            }
        }
    }, [user])
    return
}

export default AutoVerify
