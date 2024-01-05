import { Typography } from "@mui/material";
import { DemoCodeProps } from "../DemoList";
import Component, { COMPONENT_CODE } from "./code/component";
import { MODEL_CODE } from "./code/model";
import { VALIDATORS_CODE } from "./shared/validators";

const DemoProps = {
  title: "Creating Custom Async Validators",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        Creating custom async decorator validators is the same as creating sync validators. The only
        difference is that async validators must return a promise. Check example below (example
        assumes the following usernames already exist: <strong>test1</strong>,{" "}
        <strong>test2</strong> & <strong>test3</strong>).
      </Typography>
    </div>
  ),
  relatedFAQ: [
    "how to create a custom async validator decorator?",
    "how to apply created async decorator to class field?",
    "how to use useForm to render async field errors?",
  ],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
    { name: "validators.ts", lang: "typescript", code: VALIDATORS_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
