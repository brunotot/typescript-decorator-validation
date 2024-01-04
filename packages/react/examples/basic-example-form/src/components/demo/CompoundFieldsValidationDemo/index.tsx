import { Typography } from "@mui/material";
import { DemoCodeProps } from "../DemoList";
import Component, { COMPONENT_CODE } from "./code/component";
import { MODEL_CODE } from "./code/model";

const DemoProps = {
  title: "Compound Fields Validation Demo",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        To validate compound fields in a class, the library provides an elegant solution using class
        getters to compose a compound value, which can then be validated with decorators. This
        approach simplifies the validation of interdependent fields.
        <br />
        <br />
        You start by defining a getter in your class that constructs a compound value from multiple
        class fields. For example, to ensure two fields like <code className="code">
          password
        </code>{" "}
        and <code className="code">confirmPassword</code> are identical, the getter would return a
        value that represents their comparison.
        <br />
        <br />
        Once you've defined this compound value via the getter, the library's decorators can be
        applied directly to it. The type of decorator used depends on the nature of the compound
        value. In the case of a boolean value, such as verifying if two fields match, a boolean
        validation decorator can be used.
        <br />
        <br />
        This method effectively encapsulates complex validation logic involving multiple fields
        within the class, leveraging the library's decorators to enforce the necessary validation
        rules on the compound value created by the getter.
      </Typography>
    </div>
  ),
  relatedFAQ: [
    "how can I validate multiple fields as one in a class using decorators?",
    "how do I use class getters to validate compound fields in a class?",
    "what is the purpose of creating a compound value using class getters?",
    "how do I apply decorators for validating compound values?",
  ],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
