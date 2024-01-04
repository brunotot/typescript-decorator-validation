import { Typography } from "@mui/material";
import { DemoCodeProps } from "../DemoList";
import Component, { COMPONENT_CODE } from "./code/component";
import { MODEL_CODE } from "./code/model";

const DemoProps = {
  title: "Modifying Error Messages Locale Demo",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        To modify error messages locale per individual form, you can supply{" "}
        <code className="code">useForm</code> with <strong>locale</strong> property. The library
        supports locales{" "}
        <code className="code">"en" | "hr" | "de" | "es" | "fr" | "it" | "nl"</code> . You can also
        globally define the locale. The example below showcases both types of supplying custom
        locale to <strong>tdv-core</strong>.
      </Typography>
    </div>
  ),
  relatedFAQ: [
    "how to modify the language of validation errors per single Form instance?",
    "how to globally define the language of validation errors for all Form instances?",
  ],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
