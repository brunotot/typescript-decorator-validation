import { AssertTrue, Required } from "tdv-core/validators";

export type Model = {
  password: string;
  confirmPassword: string;
};

export class ModelForm implements Model {
  @Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";

  @AssertTrue({ message: "Passwords must match" })
  get passwordsMatch() {
    return this.password === this.confirmPassword;
  }
}

// prettier-ignore
export const MODEL_CODE = 
`import { collection } from "tdv-core";

export type Model = {
  password: string;
  confirmPassword: string;
};

export class ModelForm implements Model {
  @collection.string.Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";

  @collection.boolean.AssertTrue({ message: "Passwords must match" })
  get passwordsMatch() {
    return this.password === this.confirmPassword;
  }
}`
