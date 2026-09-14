
export default function usePostData(sendData, setLoading, setReset = null) {
  if (!sendData) return [null]

  const trigger = (values, isMultiPart, params) => {

    if (setLoading) {
      setLoading(true)
    }

    // data = values
    let data = Array.isArray(values) ? values : Object.fromEntries(
      Object.entries(values).filter(([k, v]) => v !== null && v !== undefined && v !== '')
    );
    // console.log(data)
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

        if (setLoading) {
          setLoading(false)
        }
        if (setReset) {
          setReset(p => !p)
        }
        if (res.error) {
          return reject(res.error)
        }
        resolve(res?.data?.values)
      } catch (error) {
        if (setLoading) {
          setLoading(false)
        }
        if (setReset) {
          setReset(p => !p)
        }
        reject(error)
      }
    })
  }

  return [trigger]
}
