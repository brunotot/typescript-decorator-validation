import { collection } from "tdv-core";
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
  @collection.string.Email({ groups: ["native"] })
  @collection.string.Required({ groups: ["native"] })
  testEmail: string = "";

  @AdultAgeValid("custom")
  @collection.string.Numeric({ groups: ["native"] })
  age: string = "";

  @collection.string.Required({ groups: ["native"] })
  password: string = "";

  @PasswordsMustMatch("custom")
  confirmPassword: string = "";

  @collection.date.Required({ groups: ["native"] })
  dateOfBirth?: Date;

  // TODO isAsyncValid!

  /*@collection.boolean.AssertTrue({
    message: "Passwords must match!",
    groups: ["native"],
  })
  get arePasswordsEqual() {
    return this.password === this.confirmPassword;
  }*/
}
