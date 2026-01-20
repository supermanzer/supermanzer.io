/**
 *  photos.ts - A set of composables used to format data related to displaying photos
 * @function useDateStr - Formatting the date string from each phot
 * @function shutterSpeed - Calculate shutter speed based on exposure time
 */

export const useDateStr = (dateStr: string) => {
    const pattern = /^\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}$/;

    let dateVal = null;
    if (pattern.test(dateStr)) {
        const newFormat = dateStr.replace(/:/, '-').replace(/:/, '-').replace(' ', 'T');
        dateVal = new Date(newFormat);
    } else {
        dateVal = new Date(dateStr);
    }
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(dateVal);
}

export const shutterSpeed = (exposure: number) => {
    return `1/${1 / exposure}s`
}

export const photoSrc = (path: string) => {
    if (path.indexOf('/') > 0) {
        return `/${path}`
    } else {
        return path
    }
}