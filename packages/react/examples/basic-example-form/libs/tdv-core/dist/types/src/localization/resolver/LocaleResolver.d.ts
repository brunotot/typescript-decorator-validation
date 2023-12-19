/**
 * A configuration class which allows for setting the global `Locale`.
 */
declare namespace LocaleResolver {
    /**
     * 2-character locale string representation
     */
    type Locale = "en" | "hr" | "de" | "es" | "fr" | "it" | "nl";
    /**
     * Function which returns current global `Locale` value.
     */
    function getLocale(): Locale;
    /**
     * Function which sets new global `Locale` value.
     */
    function setLocale(localeValue: Locale): void;
}
export default LocaleResolver;
//# sourceMappingURL=LocaleResolver.d.ts.map