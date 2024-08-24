/**
 * An enum-like object representing a set of color codes.
 * The object is frozen to prevent modification, simulating an enum in JavaScript.
 *
 * @readonly
 * @enum {string}
 * @property {string} RED - The color red, represented by the hex code '#FF6B6B'.
 * @property {string} TEAL - The color teal, represented by the hex code '#4ECDC4'.
 * @property {string} BLUE - The color blue, represented by the hex code '#45B7D1'.
 * @property {string} LIGHT_SALMON - The color light salmon, represented by the hex code '#FFA07A'.
 * @property {string} MINT - The color mint, represented by the hex code '#98D8C8'.
 * @property {string} PINK - The color pink, represented by the hex code '#F06292'.
 * @property {string} LIGHT_GREEN - The color light green, represented by the hex code '#AED581'.
 * @property {string} YELLOW - The color yellow, represented by the hex code '#FFD54F'.
 */
export const  IconColors = Object.freeze({
    RED: '#FF6B6B',
    TEAL: '#4ECDC4',
    BLUE: '#45B7D1',
    LIGHT_SALMON: '#FFA07A',
    MINT: '#98D8C8',
    PINK: '#F06292',
    LIGHT_GREEN: '#AED581',
    YELLOW: '#FFD54F'
});