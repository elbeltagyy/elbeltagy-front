import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Given a lecture and an optional assetId, returns the matching child asset
 * if one is found, otherwise falls back to the lecture itself.
 *
 * @param {Object} lecture - The lecture object (may have a `children` array).
 * @param {string} assetId - The id of the asset to find within lecture.children.
 * @returns {Object} - The matched asset, or the lecture, or {} if no lecture yet.
 */
export default function useCurrentAsset(lecture) {
    const [searchParams] = useSearchParams()
    const assetId = searchParams.get('assetId')
    return useMemo(() => {
        if (!lecture) {
            return {}
        }
        return findAssetOrDefault(lecture, assetId)
    }, [lecture, assetId])
}

/**
 * Plain (non-hook) helper — reusable outside React too.
 */
export function findAssetOrDefault(lecture, assetId) {
    if (lecture?.children?.length && assetId) {
        return lecture.children.find(child => child._id === assetId) ?? lecture
    }
    return lecture
}