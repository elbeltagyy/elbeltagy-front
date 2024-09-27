export const DAYES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

export const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', }


export const getFullDate = (date) => {
    return new Date(date).toLocaleDateString("ar-eg", dateOptions)
}
