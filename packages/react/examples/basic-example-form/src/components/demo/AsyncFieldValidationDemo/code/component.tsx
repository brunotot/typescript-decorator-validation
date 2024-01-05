import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "tdv-react";
import { ModelForm } from "./model";

export default function Component() {
  const [token, _setToken] = useState("token");
  const [form, setForm, { errors }] = useForm(ModelForm, {
    resolveDecoratorArgs: () => ({ token }),
  });

  return (
    <TextField
      label="username"
      placeholder="Enter username"
      value={form.username}
      onChange={e => setForm({ ...form, username: e.target.value })}
      helperText={errors.username[0] ?? "Try typing 'test1'"}
      error={errors.username.length > 0}
    />
  );
}

// prettier-ignore
export const COMPONENT_CODE =
`import { TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "tdv-react";
import { ModelForm } from "./model";

export default function Component() {
  const [token, _setToken] = useState("token");
  const [form, setForm, { errors }] = useForm(ModelForm, {
    resolveDecoratorArgs: () => ({ token }),
  });

  return (
    <TextField
      label="username"
      placeholder="Enter username"
      value={form.username}
      onChange={e => setForm({ ...form, username: e.target.value })}
      helperText={errors.username[0] ?? "Try typing 'test1'"}
      error={errors.username.length > 0}
    />
  );
}`;
