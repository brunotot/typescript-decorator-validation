import { create } from "tdv-core";
import UserForm from "../../models/UserForm";

const PasswordsMustMatch = (...groups: string[]) => {
  return create<string>(
    (v, _this: UserForm) => ({
      valid: v === _this.password,
      key: "PasswordsMustMatch",
      message: "Passwords must match",
    }),
    groups
  );
};

export default PasswordsMustMatch;
