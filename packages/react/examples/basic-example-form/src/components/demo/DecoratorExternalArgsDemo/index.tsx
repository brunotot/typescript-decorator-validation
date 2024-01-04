import { List, ListItem, Typography } from "@mui/material";
import { DemoCodeProps } from "../DemoList";
import Component, { COMPONENT_CODE } from "./code/component";
import { MODEL_CODE } from "./code/model";
import { VALIDATORS_CODE } from "./shared/validators";

const DemoProps = {
  title: "Decorator Provide External Arguments Demo",
  description: (
    <div>
      <Typography variant="body2" color="text.secondary" gutterBottom paddingBlock={1}>
        Custom validators in React forms allow for dynamic and context-sensitive validation. They
        enable validators to adapt based on external data not located in the class form, such as
        React state. In the example provided, two key features are demonstrated:
        <List sx={{ listStyleType: "decimal", marginLeft: 4 }}>
          <ListItem disablePadding sx={{ display: "list-item" }}>
            <Typography variant="body2" color="text.secondary">
              Dynamic locale-based date validation: The <code className="code">@ValidDate</code>{" "}
              validator uses different date formats based on the selected locale. This showcases how
              external data (like locale) can influence validation logic.
            </Typography>
          </ListItem>
          <ListItem disablePadding sx={{ display: "list-item" }}>
            <Typography variant="body2" color="text.secondary">
              Conditional validation based on user interaction: The{" "}
              <code className="code">@ValidConditional</code> validator's behavior is toggled by a
              checkbox. When checked, it disables the validator, highlighting how user actions can
              directly affect validation rules.
            </Typography>
          </ListItem>
        </List>
      </Typography>
    </div>
  ),
  relatedFAQ: [
    "how to create and implement custom validators depending on external data?",
    "how can external states or values, like locale settings, be used to influence validation logic?",
    "how to enable or disable validators dynamically based on user interactions in a form?",
  ],
  codeData: [
    { name: "model.ts", lang: "typescript", code: MODEL_CODE },
    { name: "component.tsx", lang: "typescript", code: COMPONENT_CODE },
    { name: "validators.ts", lang: "typescript", code: VALIDATORS_CODE },
  ],
  children: <Component />,
} as DemoCodeProps;

export default DemoProps;
