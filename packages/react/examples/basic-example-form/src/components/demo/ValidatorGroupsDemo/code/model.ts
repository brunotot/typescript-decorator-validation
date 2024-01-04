import { Required } from "tdv-core/validators";
import { ValidationGroup } from "../shared/groups";

export class ModelForm {
  @Required({ groups: [ValidationGroup.DEMO_ID] })
  id: string = "";

  @Required({ groups: [ValidationGroup.DEMO_DESCRIPTION] })
  description: string = "";

  @Required({ groups: [ValidationGroup.DEMO_CREATION_DATE] })
  creationDate: string = "";

  @Required({ groups: [ValidationGroup.DEMO_DEADLINE_DATE] })
  deadlineDate: string = "";
}

// prettier-ignore
export const MODEL_CODE = 
`import { collection } from "tdv-core";
import { ValidationGroup } from "../shared/groups";

export class ModelForm {
  @collection.string.Required({ groups: [ValidationGroup.DEMO_ID] })
  id: string = "";

  @collection.string.Required({ groups: [ValidationGroup.DEMO_DESCRIPTION] })
  description: string = "";

  @collection.string.Required({ groups: [ValidationGroup.DEMO_CREATION_DATE] })
  creationDate: string = "";

  @collection.string.Required({ groups: [ValidationGroup.DEMO_DEADLINE_DATE] })
  deadlineDate: string = "";
}`
