import { useEffect, useMemo, useState } from "react";
import { DetailedErrors, EntityProcessor, Errors, Payload } from "tdv-core";
import { DecoratedValidation } from "../types/DecoratedValidation.type";
import { DecoratedValidationProps } from "../types/DecoratedValidationProps.type";

export default function useValidation<T>({
  defaultValue,
  model,
  groups = [],
}: DecoratedValidationProps<T>): DecoratedValidation<T> {
  const processor = useMemo(() => new EntityProcessor<T>(model, ...groups), []);
  const initialForm = defaultValue ?? processor.buildEmptyInstance();
  const [form, setForm] = useState<T>(initialForm);
  const payload = form as Payload<T>;
  const [detailedErrors, setDetailedErrors] = useState({} as DetailedErrors<T>);
  const [errors, setErrors] = useState({} as Errors<T>);
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
