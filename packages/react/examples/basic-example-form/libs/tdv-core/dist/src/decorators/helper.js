import { parseMessage } from "../localization";
import { Objects } from "../utilities";
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
export function buildMessageProp(options, locale, defaultMessage) {
    var _a;
    const msg = (_a = options === null || options === void 0 ? void 0 : options.message) !== null && _a !== void 0 ? _a : "";
    return msg.length > 0 ? parseMessage(locale, msg) : defaultMessage !== null && defaultMessage !== void 0 ? defaultMessage : "";
}
/**
 * Retrieves the unique groups from the provided options or returns the default groups.
 * @param options - The options object.
 * @param defaultGroups - The default groups.
 * @returns An array of unique groups.
 */
export function buildGroupsProp(options, defaultGroups = []) {
    return Array.isArray(options === null || options === void 0 ? void 0 : options.groups) ? Objects.unique(options.groups) : Objects.unique(defaultGroups);
}
/**
 * Returns the key based on the provided options or the default key.
 * @param options - The options object.
 * @param defaultKey - The default key.
 * @returns The key.
 */
export function buildKeyProp(options, defaultKey) {
    var _a;
    return (_a = options === null || options === void 0 ? void 0 : options.key) !== null && _a !== void 0 ? _a : defaultKey;
}
