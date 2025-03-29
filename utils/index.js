/**
 * TEXT UTILS - Utility functions for transforming text
 */

const lowerSnake = (str) => {
    return str.toLowerCase().split(' ').join('-')
}

const dateFormat = (str) => {
    return new Date(str).toDateString()
}


export {
    lowerSnake,
    dateFormat
}