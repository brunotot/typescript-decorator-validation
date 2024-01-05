import { ValidConditional, ValidDate } from "../shared/validators";

export class ModelForm {
  @ValidDate()
  creationDate: string = new Intl.DateTimeFormat("en-US").format(Date.now());

  @ValidConditional()
  conditionallyRenderedInput: string = "";
}

// prettier-ignore
export const MODEL_CODE = 
`import { ValidConditional, ValidDate } from "../shared/validators";

export class ModelForm {
  @ValidDate()
  creationDate: string = new Intl.DateTimeFormat("en-US").format(Date.now());

  @ValidConditional()
  conditionallyRenderedInput: string = "";
}`
