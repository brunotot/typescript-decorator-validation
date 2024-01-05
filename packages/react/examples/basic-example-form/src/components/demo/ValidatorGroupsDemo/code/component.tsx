import { Box, Checkbox, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "tdv-react";
import { ValidationGroup } from "../shared/groups";
import { ModelForm } from "./model";

export default function Component() {
  const [validationGroups, setValidationGroups] = useState<ValidationGroup[]>([
    ValidationGroup.DEMO_ID,
    ValidationGroup.DEMO_DESCRIPTION,
    ValidationGroup.DEMO_CREATION_DATE,
  ]);

  const [form, setForm, { errors }] = useForm(ModelForm, { validationGroups });

  const toggleValidationGroup = (group: ValidationGroup, checked: boolean) => {
    setValidationGroups(
      checked ? [...validationGroups, group] : validationGroups.filter(g => g !== group)
    );
  };

  const getInputProps = (group: ValidationGroup) => ({
    InputProps: {
      readOnly: validationGroups.includes(group),
      startAdornment: (
        <Checkbox
          checked={validationGroups.includes(group)}
          onClick={(e: any) => toggleValidationGroup(group, e.target.checked)}
        />
      ),
    },
  });

  const register = (field: keyof ModelForm, group: ValidationGroup, type: string) => ({
    label: field,
    placeholder: `Enter ${field}`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
    ...getInputProps(group),
  });

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <pre>{JSON.stringify({ validationGroups }, null, 2)}</pre>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField {...register("id", ValidationGroup.DEMO_ID, "text")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField {...register("description", ValidationGroup.DEMO_DESCRIPTION, "text")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField {...register("creationDate", ValidationGroup.DEMO_CREATION_DATE, "date")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField {...register("deadlineDate", ValidationGroup.DEMO_DEADLINE_DATE, "date")} />
        </Grid>
      </Grid>
    </Box>
  );
}

// prettier-ignore
export const COMPONENT_CODE =
`import { Box, Checkbox, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "tdv-react";
import { ValidationGroup } from "../shared/groups";
import { ModelForm } from "./model";

export default function Component() {
  const [validationGroups, setValidationGroups] = useState<ValidationGroup[]>([
    ValidationGroup.DEMO_ID,
    ValidationGroup.DEMO_DESCRIPTION,
    ValidationGroup.DEMO_CREATION_DATE,
  ]);

  const [form, setForm, { errors }] = useForm(ModelForm, { validationGroups });

  const toggleValidationGroup = (group: ValidationGroup, checked: boolean) => {
    setValidationGroups(
      checked ? [...validationGroups, group] 
                : validationGroups.filter(g => g !== group)
    );
  };

  const getInputProps = (group: ValidationGroup) => ({
    InputProps: {
      readOnly: validationGroups.includes(group),
      startAdornment: (
        <Checkbox
          checked={validationGroups.includes(group)}
          onClick={(e: any) => toggleValidationGroup(group, e.target.checked)}
        />
      ),
    }
  });

  const register = (field: keyof ModelForm, group: ValidationGroup, type: string) => ({
    label: field,
    placeholder: \`Enter \${field}\`,
    value: form[field],
    onChange: (e: any) => setForm({ ...form, [field]: e.target.value }),
    helperText: errors[field][0],
    error: errors[field].length > 0,
    fullWidth: true,
    type,
    InputLabelProps: { shrink: type === "text" ? undefined : true },
    ...getInputProps(group),
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField {...register("id", ValidationGroup.DEMO_ID, "text")} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField {...register("description", ValidationGroup.DEMO_DESCRIPTION, "text")} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField {...register("creationDate", ValidationGroup.DEMO_CREATION_DATE, "date")} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField {...register("deadlineDate", ValidationGroup.DEMO_DEADLINE_DATE, "date")} />
      </Grid>
    </Grid>
  );
}`;
