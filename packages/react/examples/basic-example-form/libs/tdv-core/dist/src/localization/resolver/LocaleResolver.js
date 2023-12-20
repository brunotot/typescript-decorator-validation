/**
 *  Current global locale setting, defaulted to English (**en**).
 */
let locale = "en";
/**
 * Retrieves the current global `Locale`.
 */
export function getLocale() {
    return locale;
}
/**
 * Sets the global `Locale` to the specified value.
 */
export function setLocale(localeValue) {
    locale = localeValue;
}
