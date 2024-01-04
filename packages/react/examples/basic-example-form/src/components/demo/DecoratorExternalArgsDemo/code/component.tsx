import * as MUI from "@mui/material";
import { useState } from "react";
import { useForm } from "tdv-react";
import { ModelForm } from "./model";

export default function Component() {
  const [locale, setLocale] = useState("en-US");
  const [isDisabledValidation, setIsDisabledValidation] = useState(false);
  const [form, setForm, { errors }] = useForm(ModelForm, {
    resolveDecoratorArgs: () => ({ locale, flag: isDisabledValidation }),
  });

  const register = (field: keyof ModelForm, type: string, disabled: boolean = false) => ({
    label: field,
    placeholder: `Enter ${field}`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    disabled: disabled,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={12} md={12}>
          <MUI.FormControl>
            <MUI.FormLabel>Locale</MUI.FormLabel>
            <MUI.RadioGroup onChange={e => setLocale(e.target.value)} value={locale} row>
              <MUI.FormControlLabel value="en-US" control={<MUI.Radio />} label="United States" />
              <MUI.FormControlLabel value="de-DE" control={<MUI.Radio />} label="Croatia" />
              <MUI.FormControlLabel value="en-CA" control={<MUI.Radio />} label="Canada" />
            </MUI.RadioGroup>
          </MUI.FormControl>
        </MUI.Grid>
        <MUI.Grid item xs={12} md={12}>
          <MUI.TextField {...register("creationDate", "text")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={12}>
          <MUI.FormControlLabel
            onChange={(v: any) => setIsDisabledValidation(v.target.checked)}
            control={<MUI.Checkbox checked={isDisabledValidation} />}
            label="Disable validation and enable input"
          />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={12}>
          <MUI.TextField
            {...register("conditionallyRenderedInput", "text", !isDisabledValidation)}
          />
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Box>
  );
}

// prettier-ignore
export const COMPONENT_CODE =
`import * as MUI from "@mui/material";
import { useState } from "react";
import { useForm } from "tdv-react";
import { ModelForm } from "./model";

export default function Component() {
  const [locale, setLocale] = useState("en-US");
  const [isDisabledValidation, setIsDisabledValidation] = useState(false);
  const [form, setForm, { errors }] = useForm(ModelForm, {
    resolveDecoratorArgs: () => ({ locale, flag: isDisabledValidation }),
  });

  const register = (field: keyof ModelForm, type: string, disabled: boolean = false) => ({
    label: field,
    placeholder: \`Enter \${field}\`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    disabled: disabled,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
  });

  return (
    <MUI.Box display="flex" flexWrap="wrap" gap={2}>
      <MUI.Grid container spacing={2}>
        <MUI.Grid item xs={12} md={12}>
          <MUI.FormControl>
            <MUI.FormLabel>Locale</MUI.FormLabel>
            <MUI.RadioGroup onChange={e => setLocale(e.target.value)} value={locale} row>
              <MUI.FormControlLabel value="en-US" control={<MUI.Radio />} label="United States" />
              <MUI.FormControlLabel value="de-DE" control={<MUI.Radio />} label="Croatia" />
              <MUI.FormControlLabel value="en-CA" control={<MUI.Radio />} label="Canada" />
            </MUI.RadioGroup>
          </MUI.FormControl>
        </MUI.Grid>
        <MUI.Grid item xs={12} md={12}>
          <MUI.TextField {...register("creationDate", "text")} />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={12}>
          <MUI.FormControlLabel
            onChange={(v: any) => setIsDisabledValidation(v.target.checked)}
            control={<MUI.Checkbox checked={isDisabledValidation} />}
            label="Disable validation and enable input"
          />
        </MUI.Grid>
        <MUI.Grid item xs={12} md={12}>
          <MUI.TextField
            {...register("conditionallyRenderedInput", "text", !isDisabledValidation)}
          />
        </MUI.Grid>
      </MUI.Grid>
    </MUI.Box>
  );
}`;
