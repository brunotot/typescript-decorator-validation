import { makeValidator } from "./src/decorators/decorator.facade";
import {
  DecoratorContext,
  DecoratorContextMetadata,
  ValidationGroup,
} from "./src/decorators/decorator.types";
import { Locale } from "./src/messages/message.types";
import { getLocale, setLocale } from "./src/messages/model/locale";
import EntityProcessor, {
  EntityProcessorConfig,
} from "./src/model/processor/EntityProcessor";
import { Class, StripClass } from "./src/types/Class.type";
import { DetailedErrors } from "./src/types/DetailedErrors.type";
import { Errors } from "./src/types/Errors.type";
import { Payload } from "./src/types/Payload.type";
import { ValidationEvaluator } from "./src/types/ValidationEvaluator.type";
import { ValidationResult } from "./src/types/ValidationResult.type";
import { Condition } from "./src/types/namespace/Condition.ns";
import { $ } from "./src/types/namespace/Utility.ns";
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
  StripClass,
  $ as TypeUtils,
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
