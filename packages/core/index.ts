import { makeValidator } from "./src/decorators/decorator.facade";
import {
  DecoratorContext,
  DecoratorContextMetadata,
  ValidationGroup,
} from "./src/decorators/decorator.types";
import { Locale } from "./src/messages/message.types";
import { getLocale, setLocale } from "./src/messages/models/locale";
import EntityProcessor, {
  EntityProcessorConfig,
} from "./src/reflection/models/entity.processor";
import { getClassFieldNames } from "./src/reflection/service/reflection.service";
import { Condition } from "./src/types/namespace/Condition.ns";
import { $ } from "./src/types/namespace/Utility.ns";
import { Class } from "./src/types/validation/Class.type";
import { DetailedErrors } from "./src/types/validation/DetailedErrors.type";
import { Errors } from "./src/types/validation/Errors.type";
import { Payload } from "./src/types/validation/Payload.type";
import { ValidationEvaluator } from "./src/types/validation/ValidationEvaluator.type";
import { ValidationResult } from "./src/types/validation/ValidationResult.type";
import validators from "./validators";
import Rule from "./validators/any/Rule";
export interface PrimitiveSetAppend {}

export type {
  Class,
  Condition,
  DecoratorContext,
  DecoratorContextMetadata,
  DetailedErrors,
  EntityProcessorConfig,
  Errors,
  Locale,
  Payload,
  $ as TypeUtils,
  ValidationEvaluator,
  ValidationGroup,
  ValidationResult,
};

export {
  EntityProcessor,
  Rule,
  getClassFieldNames,
  getLocale,
  makeValidator,
  setLocale,
  validators,
};
