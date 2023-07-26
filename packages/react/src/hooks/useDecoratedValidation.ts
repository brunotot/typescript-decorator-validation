import { useEffect, useMemo, useState } from "react";

import {
  Class,
  Payload,
  DetailedErrors,
  EntityProcessor,
  Errors,
} from "tdv-core";

export type OnChangeHandlerType = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type DecoratedValidationType<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  isValid: boolean;
  onChange: OnChangeHandlerType;
  detailedErrors: DetailedErrors<T>;
  errors: Errors<T>;
};

export type OnSubmitHandler<K> = (model: K) => void;

export default function useDecoratedValidation<T>(
  initialValue: Payload<T>,
  model: Class<T>
): DecoratedValidationType<T> {
  const [value, setValue] = useState<T>(initialValue as T);
  const validationHandler = useMemo(
    () => new EntityProcessor<T>(model as any),
    []
  );

  const [detailedErrors, setDetailedErrors] = useState<DetailedErrors<T>>(
    {} as any
  );
  const [errors, setErrors] = useState<Errors<T>>({} as any);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setDetailedErrors(validationHandler.getDetailedErrors(value as any));
    setErrors(validationHandler.getErrors(value as any));
  }, [value]);

  const isValid = validationHandler.isValid(value as any);

  return {
    isValid,
    value,
    setValue,
    onChange,
    errors,
    detailedErrors,
  };
}
