import { useDispatch } from 'react-redux'
import { logout, setGlobalMsg, setUser } from '../toolkit/globalSlice'
import { useNavigate } from 'react-router-dom'

export default function usePostData(sendData, setLoading) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let data

  if(!sendData) return [null]

  const trigger = (values, isMultiPart, params) => {

    if (setLoading) {
      setLoading(true)
    }

    data = values

    // removing spacing
    Object.keys(data).forEach(key => {
      if ((data[key] !== "_id" || data[key] !== "id") && !data?._id) {
        if (typeof data[key] === "string") {
          data[key] = data[key].trim()
        }
      }
    })
    
    // if multipart request into multer ...
    let formData = data
    if (isMultiPart) {
      formData = new FormData()

      Object.keys(data).forEach(key => {

        if (Array.isArray(data[key])) {
          for (let i = 0; i < data[key].length; i++) {
            formData.append(key, data[key][i]);
          }
        } else {
          formData.append(key, data[key])
        }
      })
    }

    return new Promise(async (resolve, reject) => {

      try {
        const res = await sendData(formData, params)

        if (res.error) {
          // error ===> invalid jwt or not user
          if (res.error?.data?.isKick === true) {
            if (setLoading) {
              setLoading(false)
            }
            dispatch(logout())
            dispatch(setGlobalMsg({ message: res.error?.data?.message || "sorry!, you have to log in", severity: "error" }))
            navigate('/')
            return;
          }

          if (setLoading) {
            setLoading(false)
          }
          //global error 
          dispatch(setGlobalMsg({ message: res?.error?.data?.message || res?.error?.message, severity: "error" }))
          return;
        }

        // in success
        if (res.data?.message) {
          dispatch(setGlobalMsg({ message: res.data?.message, severity: "success" }))
        }

        if (setLoading) {
          setLoading(false)
        }
        resolve(res?.data?.values)
      } catch (error) {
        if (setLoading) {
          setLoading(false)
        }
        dispatch(setGlobalMsg({ message: error.message, severity: "error" }))
        reject(error)
      }
    })
  }

  return [trigger]
}
