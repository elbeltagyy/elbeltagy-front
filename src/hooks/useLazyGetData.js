import { useDispatch } from 'react-redux'
import { logout, setGlobalMsg } from '../toolkit/globalSlice'
import { useNavigate } from 'react-router-dom'

// 1- on sending => if cahced, params query
// 2- on recieve => chache, error, loading, return on success


export default function useLazyGetData(getData) {
    // getData(query, prefereCahed)
    const navigate = useNavigate()


    const paramsSchema = {
        limit: '', page: '',
        property: 'value', // for research
        sortKey: '', sortValue: '',
        select: 'name -age ...'
    }

    const dispatch = useDispatch()
    if (!getData) return [null]

    const getFromDB = (params, enableCache = false) => {

        return new Promise(async (resolve, reject) => {
            try {
                const handledParams = Array.isArray(params) ? params : typeof params === 'object' ? Object.fromEntries(
                    Object.entries(params).filter(([k, v]) => v !== null && v !== undefined && v !== '')
                ) : params

                const result = await getData(handledParams, enableCache)
                if (result.error) {
                    // error ===> invalid jwt
                    if (result.error?.data?.isKick === true) {
                        dispatch(logout())
                        dispatch(setGlobalMsg({ message: result.error?.data?.message || "sorry!, you have to log in", severity: "error" }))
                        navigate('/')
                        return;
                    }

                    dispatch(setGlobalMsg({ message: result.error.data?.message || result.error.message || result.error.error, severity: "error" }))
                    reject(result.error)
                    return;
                }

                // in success
                resolve(result.data.values)
            } catch (error) {
                console.log('error ==>', error)

                dispatch(setGlobalMsg({ message: error.message, severity: "error" }))
                reject(error)
            }
        })
    }

    return [getFromDB]
}
