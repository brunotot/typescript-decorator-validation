import API from "../../index";
import ClassDecoratorServiceNamespace from "./service/ClassDecoratorService";
import ClassDecoratorValidatorServiceNamespace from "./service/ClassDecoratorValidatorService";
import FieldDecoratorServiceNamespace from "./service/FieldDecoratorService";
import FieldDecoratorValidatorServiceNamespace from "./service/FieldDecoratorValidatorService";
/**
 * A collection of types and interfaces for creating and handling decorators.
 */
var Decorator;
(function (Decorator) {
    /**
     * A collection of services which allow for easy manipulation of field and class decorators.
     */
    let Service;
    (function (Service) {
        Service.FieldDecoratorService = FieldDecoratorServiceNamespace;
        Service.ClassDecoratorService = ClassDecoratorServiceNamespace;
        Service.FieldDecoratorValidatorService = FieldDecoratorValidatorServiceNamespace;
        Service.ClassDecoratorValidatorService = ClassDecoratorValidatorServiceNamespace;
    })(Service = Decorator.Service || (Decorator.Service = {}));
    /**
     * Extracts a message from the provided decorator properties.
     *
     * @typeParam T - The type of the object being validated.
     *
     * @param provider - The decorator properties.
     * @param message - The default message to return if no message is found in the provider.
     *
     * @returns The extracted message or the default message if none is found.
     */
    function message(options, locale, defaultMessage) {
        var _a;
        const msg = (_a = options === null || options === void 0 ? void 0 : options.message) !== null && _a !== void 0 ? _a : API.Utilities.Strings.EMPTY;
        return msg.length > 0
            ? API.Localization.Resolver.MessageResolver.resolve(locale, msg)
            : defaultMessage !== null && defaultMessage !== void 0 ? defaultMessage : "";
    }
    Decorator.message = message;
    /**
     * Extracts validation groups from the provided decorator properties.
     * @typeParam T - The type of the object being validated.
     * @param provider - The decorator properties.
     * @returns An array of unique validation groups.
     */
    function groups(options, defaultGroups = []) {
        return Array.isArray(options === null || options === void 0 ? void 0 : options.groups)
            ? API.Utilities.Objects.unique(options.groups)
            : API.Utilities.Objects.unique(defaultGroups);
    }
    Decorator.groups = groups;
    /**
     * A helper function to determine whether to use a custom or a default key for a decorator.
     * @param options - Decorator args.
     * @param defaultKey - Key of the decorator if none present in options.
     * @returns A defined decorator key or the default value.
     */
    function key(options, defaultKey) {
        var _a;
        return (_a = options === null || options === void 0 ? void 0 : options.key) !== null && _a !== void 0 ? _a : defaultKey;
    }
    Decorator.key = key;
})(Decorator || (Decorator = {}));
export default Decorator;
