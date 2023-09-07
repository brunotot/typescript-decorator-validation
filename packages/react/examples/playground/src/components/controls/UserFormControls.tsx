import { useState } from "react";
import { FormProvider, useForm } from "tdv-react";
import UserForm from "../../models/UserForm";
import Input from "../shared/Input";

const SUBMIT_BUTTON_TRIGGERS_VALIDATION = true;
const VALIDATION_GROUPS_FACTORY: "native" | "custom" | "both" = "both";
const GROUPS =
  VALIDATION_GROUPS_FACTORY === "both"
    ? ["custom", "native"]
    : VALIDATION_GROUPS_FACTORY === "custom"
    ? ["custom"]
    : ["native"];

function onSubmitValidationFail(e: any) {
  alert(
    "Form has invalid data. Please correct them\n" + JSON.stringify(e, null, 2)
  );
}

export default function UserFormInput() {
  const [numberOfStateChanges, setNumberOfStateChanges] = useState(0);
  const [
    form,
    _,
    { providerProps, errors, isSubmitted, isValid, onSubmit, reset, mutations },
  ] = useForm<UserForm>(UserForm, {
    validationGroups: GROUPS,
    onSubmit: () => alert("Congrats, you don't have any validation errors!"),
    whenChanged: () => setNumberOfStateChanges((p) => ++p),
    defaultValue: undefined,
    standalone: true,
    validateImmediately: !SUBMIT_BUTTON_TRIGGERS_VALIDATION,
    onSubmitValidationFail,
  });

  const dateOfBirthValue = form!.dateOfBirth
    ? form.dateOfBirth.toISOString().substring(0, 10)
    : "";

  return (
    <>
      <FormProvider {...providerProps}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <Input
            value={form.testEmail}
            onChange={mutations.testEmail}
            errors={errors.testEmail}
            label="Test email"
          />
          <Input
            value={form.age}
            onChange={mutations.age}
            errors={errors.age}
            label="Age"
          />
          <Input
            value={form.password}
            onChange={mutations.password}
            errors={errors.password}
            type="password"
            label="Password"
          />
          <Input
            value={form.confirmPassword}
            onChange={mutations.confirmPassword}
            errors={errors.confirmPassword}
            type="password"
            label="Confirm password"
          />
          <Input
            value={dateOfBirthValue}
            onChange={(v) => mutations.dateOfBirth!(v ? new Date(v) : null!)}
            errors={errors.dateOfBirth}
            type="date"
            label="Date of birth"
          />
          {SUBMIT_BUTTON_TRIGGERS_VALIDATION && (
            <button
              style={{ padding: "0.5rem", fontSize: 18, marginTop: 8 }}
              onClick={onSubmit}
              disabled={isSubmitted && !isValid}
            >
              <strong>Submit</strong>
            </button>
          )}
          <p>Form changed state count: {numberOfStateChanges}</p>
          <button
            style={{ padding: "0.5rem", fontSize: 18, marginTop: 8 }}
            onClick={() => reset("testEmail")}
          >
            <strong>Reset form</strong>
          </button>
        </div>
      </FormProvider>
    </>
  );
}
