import {
  Class,
  Decorators,
  Form,
  Localization,
  PrimitiveType,
  Reflection,
  UnwrapClass,
  Utilities,
  Validation,
  ValidationResult,
  attribute,
  createClassDecorator,
  createClassValidator,
  createFieldDecorator,
  createFieldValidator,
} from "tdv-core";
import ModelForm from "../code/model";

Reflection;
Localization;
Decorators;
Utilities;
Validation;
Form;
attribute;
createFieldValidator;
createClassDecorator;
createFieldDecorator;
createClassValidator;
// @ts-ignore
type test1 = PrimitiveType;
// @ts-ignore
type test2 = ValidationResult;
// @ts-ignore
type test3 = Class;
// @ts-ignore
type test3 = UnwrapClass;

export const AdultAgeValid = (...groups: string[]) => {
  return createFieldValidator<string>(
    v => ({
      key: "Adult",
      message: "Must enter amount between 18 and 100 inclusive",
      valid: Number(v) >= 18 && Number(v) <= 100,
    }),
    groups
  );
};

export const CaseInsensitiveContains = (containText: string, ...groups: string[]) => {
  const containTextLowercase = containText.toLowerCase();
  return createFieldValidator<string>(
    (current, _context: ModelForm) => ({
      valid: (current ?? "").toLowerCase().includes(containTextLowercase),
      key: "CaseInsensitiveContains",
      message: `Text must contain \"${containTextLowercase}\"`,
    }),
    groups
  );
};

export const PasswordsMustMatch = (...groups: string[]) => {
  return createFieldValidator<string>(
    (v, _this: ModelForm) => ({
      valid: v === _this.password,
      key: "PasswordsMustMatch",
      message: "Passwords must match",
    }),
    groups
  );
};

// prettier-ignore
export const VALIDATORS_CODE = 
`import { createFieldValidator } from "tdv-core";
import ModelForm from "../code/model";

export const AdultAgeValid = (...groups: string[]) => {
  return createFieldValidator<string>(
    v => ({
      key: "Adult",
      message: "Must enter amount between 18 and 100 inclusive",
      valid: Number(v) >= 18 && Number(v) <= 100,
    }),
    groups
  );
};

export const CaseInsensitiveContains = (containText: string, ...groups: string[]) => {
  const containTextLowercase = containText.toLowerCase();
  return createFieldValidator<string>(
    (current, _context: ModelForm) => ({
      valid: (current ?? "").toLowerCase().includes(containTextLowercase),
      key: "CaseInsensitiveContains",
      message: \`Text must contain \"\${containTextLowercase}\"\`,
    }),
    groups
  );
};

export const PasswordsMustMatch = (...groups: string[]) => {
  return createFieldValidator<string>(
    (v, _this: ModelForm) => ({
      valid: v === _this.password,
      key: "PasswordsMustMatch",
      message: "Passwords must match",
    }),
    groups
  );
};`
