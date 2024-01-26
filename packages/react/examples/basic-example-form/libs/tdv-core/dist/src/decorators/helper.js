"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDecoratorMeta = exports.buildValidateIfProp = exports.buildKeyProp = exports.buildGroupsProp = exports.buildMessageProp = exports.DEFAULT_DECORATOR_META = void 0;
const _localization_1 = require("../localization");
const _utilities_1 = require("../utilities");
exports.DEFAULT_DECORATOR_META = {
    groups: [],
    validateIf: () => true,
};
function parseMessage(locale, message, args = {}) {
    try {
        return (0, _localization_1.getMessageParser)()(locale, message, args);
    }
    catch (error) {
        const title = `An error occurred while resolving "${message}" for locale "${locale}".`;
        const descr = `To fix, check your Localization.configureParser() implementation or review stack-trace.`;
        const stacktrace = `\n\n${String(error)}`;
        throw new Error(`${title} ${descr} ${stacktrace}`);
    }
}
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
function buildMessageProp(options, locale, defaultMessage = "", args = {}) {
    if (!(options === null || options === void 0 ? void 0 : options.message))
        return defaultMessage !== null && defaultMessage !== void 0 ? defaultMessage : "";
    return parseMessage(locale, options.message, args);
}
exports.buildMessageProp = buildMessageProp;
/**
 * Retrieves the unique groups from the provided options or returns the default groups.
 * @param options - The options object.
 * @param defaultGroups - The default groups.
 * @returns An array of unique groups.
 */
function buildGroupsProp(options, defaultGroups = []) {
    return Array.isArray(options === null || options === void 0 ? void 0 : options.groups)
        ? _utilities_1.Objects.unique(options.groups)
        : _utilities_1.Objects.unique(defaultGroups);
}
exports.buildGroupsProp = buildGroupsProp;
/**
 * Returns the key based on the provided options or the default key.
 * @param options - The options object.
 * @param defaultKey - The default key.
 * @returns The key.
 */
function buildKeyProp(options, defaultKey) {
    var _a;
    return (_a = options === null || options === void 0 ? void 0 : options.key) !== null && _a !== void 0 ? _a : defaultKey;
}
exports.buildKeyProp = buildKeyProp;
function buildValidateIfProp(options) {
    var _a;
    return (_a = options === null || options === void 0 ? void 0 : options.validateIf) !== null && _a !== void 0 ? _a : (() => true);
}
exports.buildValidateIfProp = buildValidateIfProp;
function buildDecoratorMeta(options) {
    return {
        groups: buildGroupsProp(options),
        validateIf: buildValidateIfProp(options),
    };
}
exports.buildDecoratorMeta = buildDecoratorMeta;
