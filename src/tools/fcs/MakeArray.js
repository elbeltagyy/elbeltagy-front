export const makeArrWithValueAndLabel = (arr, { value, label, isNumber = false }) => {
    let options = []
    const myArr = [...arr]

    if (myArr.length === 0) return []
    myArr.map(ele => {
        if (isNumber) {
            options.push({ value: Number(ele[value]), label: ele[label] })
        } else {
            options.push({ value: ele[value], label: ele[label] })
        }
    })
    return options
}


export const filterWithFoundKey = (arr, { key }) => {
    const myArr = [...arr]

    myArr.filter(ele => {
        ele[key]
    })
    return myArr
}

export const filterArrWithValue = (arr, { key, value }, isOne) => {
    const myArr = [...arr]
    let filtered = []

    myArr.map(ele => {
        ele[key] === value && filtered.push(ele)
    })

    if (isOne) {

        return filtered[0]
    } else {
        return filtered
    }
}

export const convertObjToArray = (obj = {}) => {
    const arrayOfKeys = Object.keys(obj);
    const arrayOfValues = Object.values(obj);
    return [arrayOfValues, arrayOfKeys]
}

export const handelObjsOfArr = (arr, newObj) => {

    const [vals, keys] = convertObjToArray(newObj)

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj)
    }
    // const newArr = arr.map(ele => {
    //     const createdObj = {}
    //     keys.forEach((key, i) => {
    //         const value = ele[vals[i]]

    //         createdObj[key] = value
    //     })
    //     return createdObj
    // })

    const newArr = arr.map(ele => {
        const createdObj = {}
        keys.forEach((key, i) => {
            // console.log('ele ==>', ele, 'vals[i] ===>', vals[i], 'ele[vals[i]] ===>', ele[vals[i]])
            const path = vals[i]
            const value = getNestedValue(ele, path)
            createdObj[key] = value
        })
        return createdObj
    })

    return newArr
}