import { Collection } from "tdv-core";
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
  @Collection.string.Email({ groups: "native" })
  @Collection.string.Required({ groups: "native" })
  testEmail: string = "";

  @AdultAgeValid("custom")
  @Collection.string.Numeric({ groups: "native" })
  age: string = "";

  @Collection.string.Password({ groups: "native" })
  @Collection.string.Required({ groups: "native" })
  password: string = "";

  @PasswordsMustMatch("custom")
  confirmPassword: string = "";

  @Collection.date.Required({ groups: "native" })
  dateOfBirth?: Date;

  /*@Collection.boolean.AssertTrue({
    message: "Passwords must match!",
    groups: "native",
  })
  get arePasswordsEqual() {
    return this.password === this.confirmPassword;
  }*/
}
