import { Warning } from "@mui/icons-material";
import * as MUI from "@mui/material";
import { useForm } from "tdv-react";
import { Code } from "../../../shared/Code";
import { Model, ModelForm } from "./model";

export default function Component() {
  const [form, setForm, { errors }] = useForm(ModelForm);

  const register = (field: keyof Model, type: string) => ({
    label: field,
    placeholder: `Enter ${field}`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
  });

  return (
    <>
      <Code
        style={{ paddingBottom: "1.25rem" }}
        showLineNumbers={false}
        showCopyButton={false}
        code={`errors: ${JSON.stringify(errors, null, 2)}`}
      />
      <MUI.Box display="flex" flexWrap="wrap" gap={2}>
        <MUI.Grid container spacing={2}>
          <MUI.Grid item xs={12} md={6}>
            <MUI.TextField {...register("password", "text")} />
          </MUI.Grid>
          <MUI.Grid item xs={12} md={6}>
            <MUI.TextField {...register("confirmPassword", "text")} />
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Box>
      {errors.passwordsMatch.map((msg: string) => (
        <MUI.Box key={msg} gap={1} display="flex" alignItems="center" paddingTop={1.5}>
          <Warning color="warning" /> <MUI.Typography color="warning.main">{msg}</MUI.Typography>
        </MUI.Box>
      ))}
    </>
  );
}

// prettier-ignore
export const COMPONENT_CODE =
`import * as MUI from "@mui/material";
import { Warning } from "@mui/icons-material";
import { useForm } from "tdv-react";
import { Model, ModelForm } from "./model";

export default function Component() {
  const [form, setForm, { errors }] = useForm(ModelForm);

  const register = (field: keyof Model, type: string) => ({
    label: field,
    placeholder: \`Enter \${field}\`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
  });

  return (
    <>
      <MUI.Box display="flex" flexWrap="wrap" gap={2}>
        <MUI.Grid container spacing={2}>
          <MUI.Grid item xs={12} md={6}>
            <MUI.TextField {...register("password", "text")} />
          </MUI.Grid>
          <MUI.Grid item xs={12} md={6}>
            <MUI.TextField {...register("confirmPassword", "text")} />
          </MUI.Grid>
        </MUI.Grid>
      </MUI.Box>
      {errors.passwordsMatch.map(msg => (
        <MUI.Box key={msg} display="flex" alignItems="center" gap={1} paddingTop={1.5}>
          <Warning color="warning" /> <MUI.Typography color="warning.main">{msg}</MUI.Typography>
        </MUI.Box>
      ))}
    </>
  );
}`;
