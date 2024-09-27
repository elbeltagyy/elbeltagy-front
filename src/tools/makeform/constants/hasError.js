export const hasError = (props, inputName) => {

    const type = typeof props?.getFieldMeta(inputName)?.error
    return props.getFieldMeta(inputName).error && props.getFieldMeta(inputName).touched && type === "string"
}