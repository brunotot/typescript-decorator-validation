import Rule from "./src/decorators/Rule";
import { validators } from "./src/model/const/Validators";
import ValidatorService from "./src/service/ValidatorService";
import { ValidationResult } from "./src/model/type/ValidationResult.type";
import { ErrorData } from "./src/model/type/ErrorData.type";
import { Class } from "./src/model/type/Class.type";
import { ValidationClass } from "./src/model/type/ValidationClass.type";
import ValidationHandler, {
  ValidationFn,
  SimpleErrorData,
} from "./src/handler/ValidationHandler";
import { ValidationGroup } from "./src/model/enum/ValidationGroup";
import { Locale, getLocale, setLocale } from "./src/model/messages/Locale";
import strategy from "./src/model/const/Strategy";

export type {
  Class,
  ValidationResult,
  ValidationFn,
  ErrorData,
  ValidationClass,
  SimpleErrorData,
};

export {
  strategy,
  ValidationGroup,
  ValidatorService,
  validators,
  Rule,
  ValidationHandler,
  Locale,
  getLocale,
  setLocale,
};
