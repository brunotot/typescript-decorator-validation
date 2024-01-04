import { createFieldValidator } from "tdv-core";

const DateFormat = {
  "en-US": /^\d{1,2}\/\d{1,2}\/\d{4}$/, // MM/DD/YYYY
  "de-DE": /^\d{1,2}\.\d{1,2}\.\d{4}$/, // DD.MM.YYYY
  "en-CA": /^\d{4}-\d{1,2}-\d{1,2}$/, // YYYY-MM-DD
};

export const ValidDate = () => {
  return createFieldValidator<string>((value, _this, _tdvLocale, { locale = "en-US" }) => {
    return {
      key: "ValidDate",
      valid: DateFormat[locale as keyof typeof DateFormat].test(value),
      message: `Date format invalid. Expected format: ${new Intl.DateTimeFormat(locale).format(
        Date.now()
      )}`,
    };
  });
};

export const ValidConditional = () => {
  return createFieldValidator<string>((value, _this, _tdvLocale, { flag = false }) => {
    return {
      key: "ValidConditional",
      valid: flag || value.length > 0,
      message: "Field is mandatory",
    };
  });
};

// prettier-ignore
export const VALIDATORS_CODE =
`import { createFieldValidator } from "tdv-core";

const DateFormat = {
  "en-US": /^\\d{1,2}\\/\\d{1,2}\\/\\d{4}$\/, // MM/DD/YYYY
  "de-DE": /^\\d{1,2}\.\\d{1,2}\.\\d{4}$\/, // DD.MM.YYYY
  "en-CA": /^\\d{4}-\\d{1,2}-\\d{1,2}$\/, // YYYY-MM-DD
};

export const ValidDate = () => {
  return createFieldValidator<string>((value, _this, _tdvLocale, { locale = "en-US" }) => {
    return {
      key: "ValidDate",
      valid: DateFormat[locale as keyof typeof DateFormat].test(value),
      message: \`Date format invalid. Expected format: \${new Intl.DateTimeFormat(locale).format(
        Date.now()
      )}\`,
    };
  });
};

export const ValidConditional = () => {
  return createFieldValidator<string>((value, _this, _tdvLocale, { flag = false }) => {
    return {
      key: "ValidConditional",
      valid: flag || value.length > 0,
      message: "Field is mandatory",
    };
  });
};`
