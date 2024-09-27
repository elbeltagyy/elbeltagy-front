export const makeArrWithValueAndLabel = (arr, { value, label }) => {
    let options = []
    const myArr = [...arr]

    if (myArr.length === 0) return []
    myArr.map(ele => {
        options.push({ value: ele[value], label: ele[label] })
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
