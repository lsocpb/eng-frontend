/**
 * Enum for allowed image file extensions.
 * @readonly
 * @enum {string}
 */
export const AllowedImageExtensions = {
    PNG: 'png',
    JPG: 'jpg',
    JPEG: 'jpeg',
    GIF: 'gif',
    SVG: 'svg',
    WEBP: 'webp',
};

/**
 * Enum for maximum image file sizes in bytes.
 * @readonly
 * @enum {number}
 */
export const MaxImageSize = {
    FIVE_MB: 5 * 1024 * 1024, // 5MB
};
