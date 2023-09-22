/**
 * A collection of commonly used regular expressions.
 *
 * @remarks
 * This object provides regular expressions for various validation scenarios.
 *
 * @example
 * ```typescript
 * const isURL = RegexConst.URL.test("https://example.com");
 * ```
 */
// prettier-ignore
const RegexConst = {
  /** Regular expression for validating URLs. */
  URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  
  /** Regular expression for validating email addresses. */
  EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  
  /** Regular expression for validating numeric strings. */
  NUMERIC: /^[0-9]+$/,
  
  /** Regular expression for validating alphabetic strings. */
  ALPHA: /^[a-zA-Z]+$/,
  
  /** Regular expression for validating IP addresses. */
  IP_ADDRESS: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
  
  /** Regular expression for validating uppercase alphabetic strings. */
  UPPERCASE: /^[A-Z]+$/,
  
  /** Regular expression for validating lowercase alphabetic strings. */
  LOWERCASE: /^[a-z]+$/,
  
  /** Regular expression for finding uppercase alphabetic characters anywhere in a string. */
  UPPERCASE_ANYWHERE: /[A-Z]/,
  
  /** Regular expression for finding lowercase alphabetic characters anywhere in a string. */
  LOWERCASE_ANYWHERE: /[a-z]/,
  
  /** Regular expression for finding special characters anywhere in a string. */
  SPECIALS_ANYWHERE: /[^a-zA-Z0-9]/,
  
  /** Regular expression for finding numeric characters anywhere in a string. */
  NUMERIC_ANYWHERE: /\d/,
  
  /** Regular expression for validating alphanumeric strings. */
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/
} as const;

export default RegexConst;
