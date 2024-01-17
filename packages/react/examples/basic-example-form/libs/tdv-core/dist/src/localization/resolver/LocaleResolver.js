"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalLocale = exports.getGlobalLocale = void 0;
let locale = "en";
/** Returns the current global {@link Locale `Locale`} value. */
function getGlobalLocale() {
    return locale;
}
exports.getGlobalLocale = getGlobalLocale;
/** Sets the global {@link Locale `Locale`} to the specified value. */
function setGlobalLocale(localeValue) {
    locale = localeValue;
}
exports.setGlobalLocale = setGlobalLocale;
