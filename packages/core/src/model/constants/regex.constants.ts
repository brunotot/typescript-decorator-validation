// prettier-ignore
const RegexConst = {
  URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  NUMERIC: /^[0-9]+$/,
  ALPHA: /^[a-zA-Z]+$/,
  IP_ADDRESS: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
  UPPERCASE: /^[A-Z]+$/,
  LOWERCASE: /^[A-Z]+$/,
  UPPERCASE_ANYWHERE: /[A-Z]/,
  LOWERCASE_ANYWHERE: /[a-z]/,
  SPECIALS_ANYWHERE: /[^a-zA-Z0-9]/,
  NUMERIC_ANYWHERE: /\d/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/
} as const;

export default RegexConst;
