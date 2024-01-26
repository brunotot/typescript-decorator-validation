import { type Locale } from "../localization";
import { type MessageProp } from "../overrides";
export type DecoratorGroup = string;
export type DecoratorValidateIf<Class> = (context: Class) => boolean;
export type DecoratorMeta<Class> = {
    groups?: DecoratorGroup[];
    validateIf?: DecoratorValidateIf<Class>;
};
export declare const DEFAULT_DECORATOR_META: DecoratorMeta<any>;
/** Represents decorator external dependency arguments. */
export type DecoratorArgs = Record<string, any>;
/** Generic validator decorator configurable options. */
export type DecoratorOptions<_This = any, Value = any> = {
    /** Identifier of the validator decorator. */
    key?: string;
    /** Error message to be evaluated through a preprocessor, which can have a custom or default implementation based on library setup. */
    message?: MessageProp;
    /** Unique list of groups for conditional validation. Validator triggers only if the form is applied on a listed group. */
    groups?: DecoratorGroup[];
    /** asdf */
    validateIf?: DecoratorValidateIf<Value>;
};
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
export declare function buildMessageProp(options: DecoratorOptions | undefined, locale: Locale, defaultMessage?: string, args?: Record<string, string>): string;
/**
 * Retrieves the unique groups from the provided options or returns the default groups.
 * @param options - The options object.
 * @param defaultGroups - The default groups.
 * @returns An array of unique groups.
 */
export declare function buildGroupsProp(options?: DecoratorOptions, defaultGroups?: string[]): string[];
/**
 * Returns the key based on the provided options or the default key.
 * @param options - The options object.
 * @param defaultKey - The default key.
 * @returns The key.
 */
export declare function buildKeyProp(options: DecoratorOptions | undefined, defaultKey: string): string;
export declare function buildValidateIfProp(options: DecoratorOptions | undefined): (context: any) => boolean;
export declare function buildDecoratorMeta(options: DecoratorOptions | undefined): DecoratorMeta<any>;
//# sourceMappingURL=helper.d.ts.map