import "tdv-core";
import { validators } from "tdv-core";
import AdultAgeValid from "../validators/AdultAgeValid";
import CaseInsensitiveContains from "../validators/CaseInsensitiveContains";
import PasswordsMustMatch from "../validators/PasswordsMustMatch";

export type User = {
  testEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

export default class UserForm implements User {
  @CaseInsensitiveContains("Test", "custom")
  @validators.string.Email({ groups: "native" })
  @validators.string.Required({ groups: "native" })
  testEmail: string = "";

  @AdultAgeValid("custom")
  @validators.string.Numeric({ groups: "native" })
  age: string = "";

  @validators.string.Password({ groups: "native" })
  @validators.string.Required({ groups: "native" })
  password: string = "";

  @PasswordsMustMatch("custom")
  confirmPassword: string = "";

  @validators.date.Required({ groups: "native" })
  dateOfBirth?: Date;

  @validators.boolean.Truthy({
    message: "Passwords must match!",
    groups: "native",
  })
  private get arePasswordsEqual() {
    return this.password === this.confirmPassword;
  }
}
