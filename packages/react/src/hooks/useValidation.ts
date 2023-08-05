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
  const [value, setValue] = useState<T>(
    defaultValue ?? processor.buildEmptyInstance()
  );
  const [detailedErrors, setDetailedErrors] = useState<DetailedErrors<T>>(
    {} as DetailedErrors<T>
  );
  const [errors, setErrors] = useState<Errors<T>>({} as Errors<T>);
  const payload = value as Payload<T>;

  useEffect(() => {
    const processorLocal = processor;
    if (processorLocal) {
      debugger;
    }
    setDetailedErrors(processor.getDetailedErrors(payload));
    setErrors(processor.getErrors(payload));
  }, [value]);

  return {
    valid: processor.isValid(payload),
    value,
    setValue,
    errors,
    detailedErrors,
  };
}
