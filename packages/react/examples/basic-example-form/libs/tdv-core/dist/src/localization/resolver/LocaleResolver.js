/**
 * A configuration class which allows for setting the global `Locale`.
 */
var LocaleResolver;
(function (LocaleResolver) {
    let locale = "en";
    /**
     * Function which returns current global `Locale` value.
     */
    function getLocale() {
        return locale;
    }
    LocaleResolver.getLocale = getLocale;
    /**
     * Function which sets new global `Locale` value.
     */
    function setLocale(localeValue) {
        locale = localeValue;
    }
    LocaleResolver.setLocale = setLocale;
})(LocaleResolver || (LocaleResolver = {}));
export default LocaleResolver;
