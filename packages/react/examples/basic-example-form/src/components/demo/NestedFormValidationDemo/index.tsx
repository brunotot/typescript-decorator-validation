import { Typography } from "@mui/material";
import { DemoCodeProps } from "../DemoList";
import Component, { COMPONENT_CODE } from "./code/component";
import { MODEL_CODE } from "./code/model";

const DemoProps = {
  title: "Nested Form Validation Demo",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        Nested Form Validation Demo
      </Typography>
    </div>
  ),
  relatedFAQ: ["TODO", "TODO", "TODO"],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
