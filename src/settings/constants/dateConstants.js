import dayjs from "dayjs"
import ms from "ms"

export const DAYES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

export const dateOptions = {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Africa/Cairo',

}

const dateWithTimeOptions = {
    ...dateOptions,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
}

export const getFullDate = (date) => {
    return new Date(date).toLocaleDateString("ar-eg", dateOptions)
}

export const getDateWithTime = (date) => {
    return new Date(date).toLocaleDateString("ar-eg", dateWithTimeOptions)
}

// Extend Day.js with the duration plugin

export const formatDuration = (ms) => {
    let milliSeconds = ms
    if (/[a-zA-Z]/.test(ms)) {
        // Run something if there is a letter
        milliSeconds = convertToMs(ms)
    }
    // Calculate total seconds from milliseconds
    const totalSeconds = Math.floor(milliSeconds / 1000);

    // Calculate hours, minutes, and seconds
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`
}

export const convertToMs = (duration) => {
    let milliSeconds = 0
    let durArr = duration.split(' ')

    if (Array.isArray(durArr)) {
        durArr?.map(unit => {
            milliSeconds = milliSeconds + ms(unit)
        })
    } else {
        milliSeconds = milliSeconds + ms(duration)
    }
    return milliSeconds
}