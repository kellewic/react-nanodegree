/**
 * Map of language codes to their names
 */
export const LANGUAGE_CODES = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    hi: "Hindi",
}

/**
 * Get the name of a language from its code
 * @param {string} code - Language code
 * @returns {string} Language name
 */
export const getLanguageName = (code) => {
    return LANGUAGE_CODES[code] || code;
};