import { useCallback, useEffect, useMemo, useRef, useState } from "react"

function usePaginate({ getData, params = {}, key, limit = 100, pollingInterval = 0, skip, pagingKey = 'count',
    setPaging = null, }) {
    //if SetPage ==> No limit or page default
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [resetFlag, setResetFlag] = useState(false)
    const pollingRef = useRef(null)
    const modifiedPagingRef = useRef(null) // ← ref, not state


    const pageRef = useRef(1)

    // Stable params string — safe to put in a dep array, order-invariant
    const paramsKey = useMemo(
        () => JSON.stringify(params, Object.keys(params).sort()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(params)]
    )

    const hasPrev = pageRef.current > 1
    const fetchData = useCallback(async (page, append = false, signal, poling) => {
        if (skip) return

        const paginationPayload = !setPaging ? { limit, page } : ((poling && modifiedPagingRef.current) ? modifiedPagingRef.current : page)
        modifiedPagingRef.current = paginationPayload  // ← update ref, no re-render

        const { data: newData } = await getData({ ...params, ...paginationPayload })

        // If this request was cancelled while in flight, bail out silently
        if (signal?.aborted) return

        const count = newData.values[pagingKey]
        const items = !key ? newData.values : newData.values[key]

        setData(prev => append ? [...prev, ...items] : items)
        if (setPaging) {
            setPaging(count)
        } else {
            setHasMore(page * limit < count)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData, paramsKey, limit, key])

    // Fresh fetch whenever params or resetFlag change.
    // AbortController replaces the isMountedRef pattern — it handles both
    // cleanup (unmount) and cancellation (rapid param changes).
    useEffect(() => {
        const controller = new AbortController()
        pageRef.current = 1
        fetchData(1, false, controller.signal)

        if (pollingInterval >= 1000) {
            pollingRef.current = setInterval(() => {
                fetchData(pageRef.current, false, controller.signal, true)
            }, pollingInterval)
        }


        return () => {
            controller.abort()
            clearInterval(pollingRef.current)

        }
    }, [fetchData, pollingInterval, resetFlag, skip])

    // Re-fetch the current page without changing it (e.g. after a mutation)
    const refetch = useCallback(() => {
        fetchData(pageRef.current, false)
    }, [fetchData])

    // Append next page to the existing list (infinite scroll)
    const loadMore = useCallback((paging) => {
        if (setPaging) {
            fetchData(paging, true)
            return
        }
        if (!hasMore) return
        const nextPage = pageRef.current + 1
        pageRef.current = nextPage
        fetchData(nextPage, true)
    }, [hasMore, fetchData, setPaging])

    const loadNext = useCallback((paging) => {
        if (setPaging) {
            fetchData(paging, false)
            return
        }
        if (!hasMore) return
        const nextPage = pageRef.current + 1
        pageRef.current = nextPage
        fetchData(nextPage, false)
    }, [hasMore, fetchData, setPaging])

    const loadPrev = useCallback(() => {
        if (pageRef.current <= 1) return
        const prevPage = pageRef.current - 1
        pageRef.current = prevPage
        fetchData(prevPage, false)
    }, [fetchData])

    const triggerReset = useCallback(() => setResetFlag(f => !f), [])

    return {
        data,
        hasMore,
        hasPrev,
        loadMore,
        loadPrev,
        loadNext,
        refetch,
        setReset: triggerReset, setData
    }
}

export default usePaginate