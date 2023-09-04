import { Rule, ValidationGroup } from "tdv-core";

const AdultAgeValid = (...groups: ValidationGroup[]) => {
  return Rule<string>({
    groups,
    isValid: (v) => ({
      key: "Adult",
      message: "Must enter amount between 18 and 100 inclusive",
      valid: Number(v) >= 18 && Number(v) <= 100,
    }),
  });
};

export default AdultAgeValid;