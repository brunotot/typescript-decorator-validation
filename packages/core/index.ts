import { makeValidator } from "./src/decorators/facade/validator.facade";
import { DecoratorContextMetadata } from "./src/decorators/types/DecoratorContext.type";
import { ValidationGroup } from "./src/decorators/types/DecoratorProps.type";
import { Locale, getLocale, setLocale } from "./src/messages/model/Locale";
import EntityProcessor from "./src/model/processor/EntityProcessor";
import { Class, StripClass } from "./src/types/Class.type";
import { DetailedErrors } from "./src/types/DetailedErrors.type";
import { Errors } from "./src/types/Errors.type";
import { Payload } from "./src/types/Payload.type";
import { ValidationEvaluator } from "./src/types/ValidationEvaluator.type";
import { ValidationResult } from "./src/types/ValidationResult.type";
import validators from "./validators";
import Rule from "./validators/any/Rule";

export interface PrimitiveSetAppend {}

export type {
  Class,
  DecoratorContextMetadata,
  DetailedErrors,
  Errors,
  Locale,
  Payload,
  StripClass,
  ValidationEvaluator,
  ValidationGroup,
  ValidationResult,
};

export {
  EntityProcessor,
  Rule,
  getLocale,
  makeValidator,
  setLocale,
  validators,
};
