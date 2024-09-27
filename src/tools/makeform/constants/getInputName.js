
export const getInputName = (nestedInputName, input) => {
    // console.log('getInput name')
    let inputName
    if (nestedInputName) {
        inputName = nestedInputName
    } else {
        inputName = input.name
    }
    return inputName
}
