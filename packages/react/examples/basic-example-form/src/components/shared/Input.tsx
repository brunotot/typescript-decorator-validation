import Errors from "./Errors";

export type InputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
  type?: "text" | "password" | "date";
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
}: InputProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.125rem",
        flexDirection: "column",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        backgroundColor: errors.length === 0 ? "green" : "lightgray",
        textAlign: "left",
      }}
    >
      {label}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        style={{ padding: "0.75rem", marginBottom: 2 }}
        onChange={(e) => onChange(e.target.value)}
      />
      <Errors errors={errors} />
    </div>
  );
}
