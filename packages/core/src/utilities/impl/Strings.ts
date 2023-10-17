/**
 * Collection of string-related types and methods.
 */
namespace Strings {
  export const EMPTY = "";

  /**
   * Converts a camelCase string to a text string with spaces.
   * @param camelCase - The camelCase string to convert.
   * @param capitalizeFirstLetter - Whether to capitalize the first letter. Default is true.
   * @returns A string where camelCasing is replaced by spaces.
   */
  export function convertCamelCaseToText(
    camelCase: string,
    capitalizeFirstLetter: boolean = true
  ): string {
    if (camelCase === camelCase.toUpperCase()) {
      return camelCase;
    }

    const result = camelCase
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/ (\w)/g, (str) => str.toLowerCase());

    return capitalizeFirstLetter
      ? result.replace(/^./, (str) => str.toUpperCase())
      : result;
  }

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
  export function sprintf(str: string, ...args: any[]): string {
    return str.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== "undefined" ? args[number] : match;
    });
  }
}

export default Strings;
