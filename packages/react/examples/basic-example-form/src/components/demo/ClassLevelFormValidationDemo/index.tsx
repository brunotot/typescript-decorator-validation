import { Typography } from "@mui/material";
import { DemoCodeProps } from "../DemoList";
import { Component, COMPONENT_CODE } from "./code/component";
import { MODEL_CODE } from "./code/model";
import { VALIDATORS_CODE } from "./shared/validators";

const DemoProps = {
  title: "Type-Safe Custom Class-Level Validators",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        This library feature focuses on creating custom class-level validators that are type-safe,
        ensuring that the validators are correctly applied to the intended class properties. It also
        provides a clear mechanism for rendering validation errors at the class level in the UI.
        <br />
        <br />
        In <strong>model.ts</strong>, the EqualFields decorator demonstrates type-safe validation at
        the class level. Applied to the ModelForm class, it ensures the{" "}
        <code className="code">password</code> and <code className="code">confirmPassword</code>
        fields match, leveraging TypeScript's type safety features to align the validation logic
        with the class's property types.
        <br />
        <br />
        The <strong>component.tsx</strong> file showcases the display of class-level validation
        errors through <code className="code">globalErrors</code>. This part of the code focuses on
        rendering errors that arise from class-level validators in the form's user interface.
        <br />
        <br />
        In validators.ts, the EqualFields function is a prime example of implementing a type-safe
        class-level validator. It uses generic types{" "}
        <code className="code">{`<C extends Class>`}</code> in conjunction with
        <code className="code">{`createClassValidator<C>`}</code>, ensuring that the validator is
        strictly associated with the class type it validates. This usage of generics ensures that
        the fields being validated are indeed properties of the class, thereby providing a robust
        guard for type correctness.
      </Typography>
    </div>
  ),
  relatedFAQ: [
    "how to create a custom class validation decorator?",
    "how to properly type a custom class decorator?",
    "how can I ensure that my custom class decorators are correctly bound to a specific class?",
  ],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
    { name: "validators.ts", lang: "typescript", code: VALIDATORS_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
