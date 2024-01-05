import API from "../../index";
export * from "./data";
export * from "./factory";

/** Represents decorator external dependency arguments. */
export type DecoratorArgs = Record<string, any>;

/** Generic validator decorator configurable options. */
export type DecoratorOptions = {
  /** Identifier of the validator decorator. */
  key?: string;
  /** Error message to be evaluated through a preprocessor, which can have a custom or default implementation based on library setup. */
  message?: string;
  /** Unique list of groups for conditional validation. Validator triggers only if the form is applied on a listed group. */
  groups?: string[];
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
export function buildMessageProp(
  options: DecoratorOptions | undefined,
  locale: API.Localization.Locale,
  defaultMessage: string
): string {
  const msg = options?.message ?? "";
  return msg.length > 0 ? API.Localization.parseMessage(locale, msg) : defaultMessage ?? "";
}

/**
 * Retrieves the unique groups from the provided options or returns the default groups.
 * @param options - The options object.
 * @param defaultGroups - The default groups.
 * @returns An array of unique groups.
 */
export function buildGroupsProp(
  options?: DecoratorOptions,
  defaultGroups: string[] = []
): string[] {
  return Array.isArray(options?.groups)
    ? API.Utilities.Objects.unique(options!.groups)
    : API.Utilities.Objects.unique(defaultGroups);
}

/**
 * Returns the key based on the provided options or the default key.
 * @param options - The options object.
 * @param defaultKey - The default key.
 * @returns The key.
 */
export function buildKeyProp(options: DecoratorOptions | undefined, defaultKey: string): string {
  return options?.key ?? defaultKey;
}
