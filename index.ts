import { validators } from "./src/model/const/Validators";
import { ValidationResult } from "./src/model/type/ValidationResult.type";
import { ErrorData } from "./src/model/type/ErrorData.type";
import { Class } from "./src/model/type/Class.type";
import { ValidationClass } from "./src/model/type/ValidationClass.type";
import ValidationHandler, {
  ValidationFn,
  SimpleErrorData,
} from "./src/handler/ValidationHandler";
import { ValidationGroup } from "./src/model/enum/ValidationGroup";
import { Locale, getLocale, setLocale } from "./src/messages/model/Locale";
import Rule from "./validators/impl/any/Rule";
import ValidatorFactory from "./validators/common/ValidatorFactory";

export interface PrimitiveSetAppend {}

export type {
  Class,
  ValidationResult,
  ValidationFn,
  ErrorData,
  ValidationClass,
  SimpleErrorData,
  Locale,
};

export {
  ValidationGroup,
  ValidatorFactory,
  validators,
  Rule,
  ValidationHandler,
  getLocale,
  setLocale,
};
