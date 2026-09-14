import { useDispatch } from 'react-redux'
import { setGlobalMsg } from '../toolkit/globalSlice'

export default function useLazyGetData(getData) {
    const dispatch = useDispatch()

    if (!getData) return [null]

    const getFromDB = (params, enableCache = false) => {

        return new Promise(async (resolve, reject) => {
            try {
                const result = await getData(params, enableCache)
                if (result.error) {
                    return reject(result.error)
                }
                resolve(result.data.values)
            } catch (error) {
                // console.log('error ==>', error)
                dispatch(setGlobalMsg({ message: error.message, severity: "error" }))
                reject(error)
            }
        })
    }

    return [getFromDB]
}
