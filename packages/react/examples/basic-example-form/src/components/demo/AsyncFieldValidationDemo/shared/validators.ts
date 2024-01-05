import { createFieldValidator, ValidationResult } from "tdv-core";
import { ModelForm } from "../code/model";

export const UniqueUsername = (...groups: string[]) => {
  // @ts-ignore
  return createFieldValidator<string>((username, _this: ModelForm, _locale, { token }) => {
    return new Promise<ValidationResult>(resolve => {
      setTimeout(() => {
        resolve({
          key: "UniqueUsername",
          valid: !["test1", "test2", "test3"].includes(username),
          message: "Username already exists!",
        });
      }, 1000);
    });
  }, groups);
};

// prettier-ignore
export const VALIDATORS_CODE =
`import { createFieldValidator, Validation } from "tdv-core";
import { DemoForm } from "../code/model";

export const UniqueUsername = (...groups: string[]) => {
  return createFieldValidator<string>((username, _this: DemoForm, _locale, { token }) => {
    return new Promise<ValidationResult>(resolve => {
      setTimeout(() => {
        resolve({
          key: "UniqueUsername",
          valid: !["test1", "test2", "test3"].includes(username),
          message: "Username already exists!",
        });
      }, 1000);
    });
  }, groups);
};`
