import useDecoratedValidation from "./src/hooks/useDecoratedValidation";
import {
  validators,
  Rule,
  ValidationResult,
  setLocale,
  Locale,
  EntityProcessor,
} from "typescript-decorator-validation";

import "typescript-decorator-validation/polyfill.d.ts";

export type { ValidationResult, Locale };

export { EntityProcessor, validators, Rule, useDecoratedValidation, setLocale };
