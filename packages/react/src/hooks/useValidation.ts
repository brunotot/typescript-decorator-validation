import { useEffect, useMemo, useState } from "react";
import { DetailedErrors, EntityProcessor, Errors, Payload } from "tdv-core";
import { DecoratedValidation } from "../types/DecoratedValidation.type";
import { DecoratedValidationProps } from "../types/DecoratedValidationProps.type";

export default function useValidation<TClass, TBody = TClass>({
  defaultValue,
  model,
  groups = [],
}: DecoratedValidationProps<TClass, TBody>): DecoratedValidation<
  TClass,
  TBody
> {
  const processor = useMemo(
    () => new EntityProcessor<TClass>(model, ...groups),
    []
  );
  const [form, setForm] = useState<TBody>(
    defaultValue ?? (processor.noArgsInstance as unknown as TBody)
  );
  const payload = form as Payload<TClass>;
  const [detailedErrors, setDetailedErrors] = useState(
    {} as DetailedErrors<TClass>
  );
  const [errors, setErrors] = useState({} as Errors<TClass>);
  const isValid = processor.isValid(payload);

  useEffect(() => {
    setDetailedErrors(processor.getDetailedErrors(payload));
    setErrors(processor.getErrors(payload));
  }, [form]);

  return {
    isValid,
    form,
    setForm,
    errors,
    detailedErrors,
    processor,
  };
}
