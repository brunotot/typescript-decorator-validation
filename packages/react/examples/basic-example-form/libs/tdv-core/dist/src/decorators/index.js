import API from "../../index";
export * from "./data";
export * from "./factory";
export var Config;
(function (Config) {
    /**
     * Retrieves the localized message based on the provided options, locale, and default message.
     * If the options contain a custom message, it will be resolved using the provided locale.
     * If no custom message is provided, the default message will be returned.
     *
     * @param options - The options object that may contain a custom message.
     * @param locale - The locale resolver used to resolve the custom message.
     * @param defaultMessage - The default message to be returned if no custom message is provided.
     * @returns The localized message.
     */
    function message(options, locale, defaultMessage) {
        var _a;
        const msg = (_a = options === null || options === void 0 ? void 0 : options.message) !== null && _a !== void 0 ? _a : "";
        return msg.length > 0 ? API.Localization.parseMessage(locale, msg) : defaultMessage !== null && defaultMessage !== void 0 ? defaultMessage : "";
    }
    Config.message = message;
    /**
     * Retrieves the unique groups from the provided options or returns the default groups.
     * @param options - The options object.
     * @param defaultGroups - The default groups.
     * @returns An array of unique groups.
     */
    function groups(options, defaultGroups = []) {
        return Array.isArray(options === null || options === void 0 ? void 0 : options.groups)
            ? API.Utilities.Objects.unique(options.groups)
            : API.Utilities.Objects.unique(defaultGroups);
    }
    Config.groups = groups;
    /**
     * Returns the key based on the provided options or the default key.
     * @param options - The options object.
     * @param defaultKey - The default key.
     * @returns The key.
     */
    function key(options, defaultKey) {
        var _a;
        return (_a = options === null || options === void 0 ? void 0 : options.key) !== null && _a !== void 0 ? _a : defaultKey;
    }
    Config.key = key;
})(Config || (Config = {}));
