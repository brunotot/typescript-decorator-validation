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
export function sprintf(str, ...args) {
    return str.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== "undefined" ? args[number] : match;
    });
}
