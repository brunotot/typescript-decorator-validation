import { Email, Numeric, Required } from "tdv-core/validators";
import { AdultAgeValid, CaseInsensitiveContains, PasswordsMustMatch } from "../shared/validators";

export type Model = {
  testEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

export default class ModelForm implements Model {
  @CaseInsensitiveContains("Test", "custom")
  @Email({ groups: ["native"] })
  @Required({ groups: ["native"] })
  testEmail: string = "";

  @AdultAgeValid("custom")
  @Numeric({ groups: ["native"] })
  age: string = "";

  @Required({ groups: ["native"] })
  password: string = "";

  @PasswordsMustMatch("custom")
  confirmPassword: string = "";

  @Required({ groups: ["native"] })
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

// prettier-ignore
export const MODEL_CODE =
`import { collection } from "tdv-core";
import { AdultAgeValid, CaseInsensitiveContains, PasswordsMustMatch } from "../shared/validators";

export type Model = {
  testEmail: string;
  age: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

export default class ModelForm implements Model {
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
}`;
