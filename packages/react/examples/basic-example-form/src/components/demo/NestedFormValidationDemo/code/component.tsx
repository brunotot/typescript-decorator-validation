import * as MUI from "@mui/material";
import { FormProvider, useForm } from "tdv-react";
import NestedForm from "../shared/NestedForm";
import { UserForm } from "./model";

export default function Component() {
  const [form, setForm, { errors, providerProps, onSubmit, reset }] = useForm(UserForm, {
    validateImmediately: false,
    onSubmit: async () => {
      console.log("submitting...");
    },
  });

  const register = (field: Exclude<keyof UserForm, "addressForm">, type: string) => ({
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
      <MUI.Card sx={{ outline: "2px solid green", borderRadius: "4px" }}>
        <MUI.CardContent>
          <MUI.Box display="flex" flexDirection="column" gap={2}>
            <MUI.Typography variant="h5" component="div" color="green">
              Model parent form
            </MUI.Typography>
            <MUI.Grid container spacing={2}>
              <MUI.Grid item xs={12}>
                <MUI.TextField {...register("firstName", "text")} />
              </MUI.Grid>
              <MUI.Grid item xs={12}>
                <MUI.TextField {...register("lastName", "text")} />
              </MUI.Grid>
            </MUI.Grid>
            <NestedForm
              defaultValue={form.addressForm}
              onChange={addressForm => setForm({ ...form, addressForm })}
            />
          </MUI.Box>
        </MUI.CardContent>
        <MUI.CardActions>
          <MUI.Button
            variant="contained"
            color="success"
            onClick={() => {
              onSubmit();
              alert(JSON.stringify(form, null, 2));
            }}
          >
            Submit
          </MUI.Button>
          <MUI.Button onClick={() => reset()} color="secondary">
            Reset
          </MUI.Button>
        </MUI.CardActions>
      </MUI.Card>
    </FormProvider>
  );
}

// prettier-ignore
export const COMPONENT_CODE =
``;
