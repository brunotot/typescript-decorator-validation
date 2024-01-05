import * as MUI from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "tdv-react";
import { AddressForm } from "../code/model";

export type NestedFormProps = {
  defaultValue: AddressForm;
  onChange: (value: AddressForm) => void;
};

export default function NestedForm({ defaultValue, onChange }: NestedFormProps) {
  const [standalone, setStandalone] = useState(false);
  const [form, setForm, { errors, providerProps, onSubmit, reset }] = useForm(AddressForm, {
    defaultValue,
    onChange,
    standalone,
    onSubmit: async () => {},
  });

  const register = (field: keyof AddressForm, type: string) => ({
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
    <FormProvider {...providerProps}>
      <MUI.Card sx={{ outline: "2px solid blue", borderRadius: "4px" }}>
        <MUI.CardContent>
          <MUI.Box display="flex" flexDirection="column" gap={2}>
            <MUI.Box display="flex" alignItems="center" gap={4}>
              <MUI.Typography variant="h5" component="div" color="blue">
                Nested address form
              </MUI.Typography>
              <MUI.FormControlLabel
                control={
                  <MUI.Checkbox
                    checked={standalone}
                    onChange={e => setStandalone(e.target.checked)}
                  />
                }
                label={
                  <>
                    standalone: <code className="code">{standalone.toString()}</code>
                  </>
                }
              />
            </MUI.Box>
            <MUI.Grid container spacing={2}>
              <MUI.Grid item xs={12} md={6}>
                <MUI.TextField {...register("country", "text")} />
              </MUI.Grid>
              <MUI.Grid item xs={12} md={6}>
                <MUI.TextField {...register("city", "text")} />
              </MUI.Grid>
              <MUI.Grid item xs={12} md={6}>
                <MUI.TextField {...register("street", "text")} />
              </MUI.Grid>
              <MUI.Grid item xs={12} md={6}>
                <MUI.TextField {...register("postalCode", "text")} />
              </MUI.Grid>
            </MUI.Grid>
          </MUI.Box>
        </MUI.CardContent>
        {standalone && (
          <MUI.CardActions>
            <MUI.Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </MUI.Button>
            <MUI.Button onClick={() => reset()} color="secondary">
              Reset
            </MUI.Button>
          </MUI.CardActions>
        )}
      </MUI.Card>
    </FormProvider>
  );
}
