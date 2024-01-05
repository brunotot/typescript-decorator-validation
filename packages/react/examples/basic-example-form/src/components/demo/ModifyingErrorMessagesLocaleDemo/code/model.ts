import { Decorators } from "tdv-core";

export class ModelForm {
  @Decorators.Required()
  id: string = "";

  @Decorators.Required()
  description: string = "";

  @Decorators.Required()
  creationDate: string = "";

  @Decorators.Required()
  deadlineDate: string = "";
}

// prettier-ignore
export const MODEL_CODE = 
`import { collection } from "tdv-core";

export class ModelForm {
  @collection.string.Required()
  id: string = "";

  @collection.string.Required()
  description: string = "";

  @collection.string.Required()
  creationDate: string = "";

  @collection.string.Required()
  deadlineDate: string = "";
}`
