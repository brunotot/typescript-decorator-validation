import { ValidationResult } from "./src/types/ValidationResult.type";
import { DetailedErrors } from "./src/types/DetailedErrors.type";
import { Class } from "./src/types/Class.type";
import { Errors } from "./src/types/Errors.type";
import { Payload } from "./src/types/Payload.type";
import { Locale, getLocale, setLocale } from "./src/messages/model/Locale";
import { makeValidator } from "./src/decorators/facade/validator.facade";
import Rule from "./validators/any/Rule";
import validators from "./validators";
import EntityProcessor from "./src/model/processor/EntityProcessor";
import { ValidationEvaluator } from "./src/types/ValidationEvaluator.type";
import { ValidationGroup } from "./src/decorators/types/DecoratorProps.type";

export interface PrimitiveSetAppend {}


export type {
  Class,
  ValidationResult,
  ValidationEvaluator,
  DetailedErrors,
  Payload,
  Errors,
  Locale,
  ValidationGroup
};

export {
  makeValidator,
  validators,
  Rule,
  EntityProcessor,
  getLocale,
  setLocale,
};
