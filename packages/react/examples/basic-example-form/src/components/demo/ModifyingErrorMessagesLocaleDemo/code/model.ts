import { Required } from "tdv-core/validators";

export class ModelForm {
  @Required()
  id: string = "";

  @Required()
  description: string = "";

  @Required()
  creationDate: string = "";

  @Required()
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
