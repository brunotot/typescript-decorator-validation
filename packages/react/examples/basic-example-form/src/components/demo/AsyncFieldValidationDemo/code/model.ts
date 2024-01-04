import { UniqueUsername } from "../shared/validators";

export class ModelForm {
  @UniqueUsername()
  username = "";
}

// prettier-ignore
export const MODEL_CODE = 
`import { UniqueUsername } from "../shared/validators";

export class ModelForm {
  @UniqueUsername()
  username = "";
}`
