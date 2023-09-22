import { getLocale } from "./models/locale";
import localeMessages from "./models/messages";

/**
 * Formats a string by replacing placeholders with provided arguments.
 *
 * @param str - The string containing placeholders in the form of `{0}`, `{1}`, etc.
 * @param args - The values to replace the placeholders with.
 * @returns The formatted string with placeholders replaced by the corresponding values from `args`.
 *
 * @example
 * ```typescript
 * const formatted = sprintf("Hello, {0}!", "World");  // Output: "Hello, World!"
 * ```
 *
 * @remarks
 * If a placeholder's corresponding value is not provided in `args`, the placeholder will remain unchanged in the output string.
 */
function sprintf(str: string, ...args: any[]) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

/**
 * Localizes a string based on a key and optional arguments.
 *
 * @param key - The key corresponding to the localized string.
 * @param args - Optional values to replace placeholders in the localized string.
 * @returns The localized and formatted string.
 *
 * @example
 * ```typescript
 * const greeting = t("hello", "Bruno");  // Output might be: "Hello, Bruno!"
 * ```
 *
 * @remarks
 * The function fetches the current locale using `getLocale()` and retrieves the corresponding message from `localeMessages`.
 * It then uses `sprintf` to replace any placeholders in the message with the provided `args`.
 */
const t = (key: string, ...args: any[]) => {
  const locale = getLocale();
  const service = localeMessages[locale];
  return sprintf(service[key], ...args);
};

export default t;
