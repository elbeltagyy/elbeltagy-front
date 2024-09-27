

export const getValues = (inputName, props) => {
    const values = props?.getFieldMeta(inputName)?.value
    return values
}