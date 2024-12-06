/**
 * TEXT UTILS - Utility functions for transforming text
 */

export const lowerSnake = (str) => {
    return str.toLowerCase().split(' ').join('-')
}