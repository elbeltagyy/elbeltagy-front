import ms from "ms"

export const DAYES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
export const DAYES_AR = ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعه", "السبت"]
export const getDay = (index) => {
    return DAYES_AR[index]
}

export function formatTime(timeInput) {
    let hours, minutes;

    // Parse input: string ("HH:mm") or Date object
    if (typeof timeInput === 'string') {
        const [h, m] = timeInput.split(':').map(Number);
        if (isNaN(h) || isNaN(m)) return ''; // Invalid format
        hours = h;
        minutes = m;
    } else if (timeInput instanceof Date) {
        hours = timeInput.getHours();
        minutes = timeInput.getMinutes();
    } else {
        return ''; // Unsupported type
    }

    // Determine period
    const period = hours < 12 ? 'صباحًا' : 'مساءً';

    // Convert to 12-hour format
    const displayHour = hours % 12 || 12;

    // Format time with leading zeros
    const formattedHour = displayHour.toString().padStart(2, '0');
    const formattedMinute = minutes.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinute} ${period}`;
}


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
const durationRegex = /^(?!^\d+$)(?:(?:\d+[hms]))(?:\s+(?:(?:\d+[hms])))*$/;

export const formatDuration = (ms, isSeconds = false, separated) => {
    if (!ms || !Number(ms) === 0) return

    let milliSeconds = ms
    if (/[a-zA-Z]/.test(ms)) {
        // Run something if there is a letter
        milliSeconds = convertToMs(ms)
        isSeconds = false
    }

    // Calculate total seconds from milliseconds
    let totalSeconds = milliSeconds
    if (!isSeconds) {
        totalSeconds = Math.floor(milliSeconds / 1000);
    }

    // Calculate hours, minutes, and seconds
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    if (separated) {
        let h = (!hours || hours !== '00') && Number(hours) + 'h' || ""
        let m = (!minutes || minutes !== '00') && Number(minutes) + 'm' || ""
        let s = (!seconds || seconds !== '00') && Number(seconds) + 's' || ""
        return h + ' ' + m + ' ' + s

    } else {
        return `${hours}:${minutes}:${seconds}`
    }
}

export const convertToMs = (duration) => {

    let milliSeconds = 0
    if (typeof duration === 'number') return duration
    // if (!durationRegex.test(duration)) {
    //     return 0
    // }
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