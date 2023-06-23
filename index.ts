import InferredType from "./src/model/enum/InferredType";
import Rule from "./src/decorators/validators/custom/Rule";
import { validators } from "./src/model/const/Validators";
import ValidatorService from "./src/service/ValidatorService";
import { ValidationResult } from "./src/model/type/validation-result.type";
import { ErrorData } from "./src/model/type/error-data.type";
import { Class } from "./src/model/type/class.type";
import { ValidationClass } from "./src/model/type/validation-class.type";
import ValidationHandler, {
  ValidationFn,
  SimpleErrorData,
} from "./src/handler/ValidationHandler";
import { ValidationGroup } from "./src/handler/ValidationGroup";
import { Locale, getLocale, setLocale } from "./src/model/messages/Locale";

export type {
  Class,
  ValidationResult,
  ValidationFn,
  ErrorData,
  ValidationClass,
  SimpleErrorData,
};

export {
  ValidationGroup,
  InferredType,
  ValidatorService,
  validators,
  Rule,
  ValidationHandler,
  Locale,
  getLocale,
  setLocale,
};
