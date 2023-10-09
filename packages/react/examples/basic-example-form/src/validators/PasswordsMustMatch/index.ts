import { create } from "tdv-core";
import UserForm from "../../models/UserForm";

const PasswordsMustMatch = (...groups: string[]) => {
  return create<string>({
    groups,
    isValid: (v, _this: UserForm) => ({
      valid: v === _this.password,
      key: "PasswordsMustMatch",
      message: "Passwords must match",
    }),
  });
};

export default PasswordsMustMatch;
