/**
 * A collection of commonly used regular expressions.
 * @remarks This object provides regular expressions for various validation scenarios.
 * @example
 * 1: Validating URLs
 * ```ts
 * const isURL = RegexConst.URL.test("https://example.com");
 * ```
 */
export declare const RegexConst: {
    /** Regular expression for validating URLs. */
    readonly URL: RegExp;
    /** Regular expression for validating email addresses. */
    readonly EMAIL: RegExp;
    /** Regular expression for validating numeric strings. */
    readonly NUMERIC: RegExp;
    /** Regular expression for validating alphabetic strings. */
    readonly ALPHA: RegExp;
    /** Regular expression for validating IP addresses. */
    readonly IP_ADDRESS: RegExp;
    /** Regular expression for validating uppercase alphabetic strings. */
    readonly UPPERCASE: RegExp;
    /** Regular expression for validating lowercase alphabetic strings. */
    readonly LOWERCASE: RegExp;
    /** Regular expression for finding uppercase alphabetic characters anywhere in a string. */
    readonly UPPERCASE_ANYWHERE: RegExp;
    /** Regular expression for finding lowercase alphabetic characters anywhere in a string. */
    readonly LOWERCASE_ANYWHERE: RegExp;
    /** Regular expression for finding special characters anywhere in a string. */
    readonly SPECIALS_ANYWHERE: RegExp;
    /** Regular expression for finding numeric characters anywhere in a string. */
    readonly NUMERIC_ANYWHERE: RegExp;
    /** Regular expression for validating alphanumeric strings. */
    readonly ALPHANUMERIC: RegExp;
};
//# sourceMappingURL=regex.constants.d.ts.map