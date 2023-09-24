import { Rule, Validation } from "tdv-core";
import UserForm from "../../models/UserForm";

const PasswordsMustMatch = (...groups: Validation.Group[]) => {
  return Rule<string>({
    groups,
    isValid: (v, _this: UserForm) => ({
      valid: v === _this.password,
      key: "PasswordsMustMatch",
      message: "Passwords must match",
    }),
  });
};

export default PasswordsMustMatch;
