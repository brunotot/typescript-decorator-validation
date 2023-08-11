import useValidation from "./src/hooks/useValidation";

import {
  EntityProcessor,
  Locale,
  Rule,
  ValidationResult,
  setLocale,
  validators,
} from "tdv-core";

import "tdv-core/polyfill.d.ts";
import FormProvider from "./src/contexts/FormContext";
import useForm from "./src/hooks/useForm";

export type { Locale, ValidationResult };

export {
  EntityProcessor,
  FormProvider,
  Rule,
  setLocale,
  useForm,
  useValidation,
  validators,
};
