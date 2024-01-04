import { TextField } from "@mui/material";

export type InputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
  type?: "text" | "password" | "date";
  labelFloatAlways?: boolean;
};

/**
 * A sample input component.
 */
export default function Input({
  value,
  onChange,
  label,
  placeholder,
  errors = [],
  type = "text",
  labelFloatAlways = false,
}: InputProps) {
  return (
    <TextField
      fullWidth
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      helperText={errors[0]}
      error={errors.length > 0}
      InputLabelProps={{ shrink: labelFloatAlways ? true : undefined }}
    />
  );
}
