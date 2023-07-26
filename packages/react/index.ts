import useValidation from "./src/hooks/useValidation";

import {
  validators,
  Rule,
  ValidationResult,
  setLocale,
  Locale,
  EntityProcessor,
} from "tdv-core";

import "tdv-core/polyfill.d.ts";

export type { ValidationResult, Locale };

export { EntityProcessor, validators, Rule, useValidation, setLocale };
