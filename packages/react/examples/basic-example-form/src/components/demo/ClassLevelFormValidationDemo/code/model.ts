import { Required } from "tdv-core";
import { EqualFields } from "../shared/validators";

@EqualFields("password", "confirmPassword")
export class ModelForm {
  @Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";
}

// prettier-ignore
export const MODEL_CODE = 
`import { collection } from "tdv-core";
import { EqualFields } from "../shared/validators";

@EqualFields("password", "confirmPassword")
export class ModelForm {
  @collection.string.Required({ message: "Password field is mandatory" })
  password: string = "";
  confirmPassword: string = "";
}`
