import { Validation } from "./src/model/type/Validation.type";
import { DetailedErrors } from "./src/model/type/DetailedErrors.type";
import { Class } from "./src/model/type/Class.type";
import { Errors } from "./src/model/type/Errors.type";
import { Payload } from "./src/model/type/Payload.type";
import { Locale, getLocale, setLocale } from "./src/messages/model/Locale";
import { makeValidator } from "./src/decorators/facade/validator.facade";
import Rule from "./validators/any/Rule";
import validators from "./validators";
import ValidationHandler, {
  ValidationFn,
} from "./src/processor/EntityProcessor";

export interface PrimitiveSetAppend {}

export type {
  Class,
  Validation,
  ValidationFn,
  DetailedErrors,
  Payload,
  Errors,
  Locale,
};

export {
  makeValidator,
  validators,
  Rule,
  ValidationHandler,
  getLocale,
  setLocale,
};
