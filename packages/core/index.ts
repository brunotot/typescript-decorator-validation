import { makeValidator } from "./src/decorators/decorator.facade";
import { Locale, Locales } from "./src/messages/message.types";
import { getLocale, setLocale } from "./src/messages/models/locale";
import EntityProcessor from "./src/reflection/models/entity.processor";
import ReflectionDescriptor, {
  DescriptorProps,
  FieldDescriptorRules,
  ReflectionDescriptorName,
  ReflectionDescriptorThis,
} from "./src/reflection/models/reflection.descriptor";
import ReflectionRule from "./src/reflection/models/reflection.rule";
import {
  ReflectionStrategy,
  ReflectionStrategyType,
} from "./src/reflection/models/reflection.strategy";
import ValidationMetaService from "./src/reflection/service/impl/reflection.service.validation";
import {
  MetaStrategy,
  getClassFieldNames,
} from "./src/reflection/service/reflection.service";
import TdvCore from "./src/types";
import Decorator from "./src/types/namespace/decorator.namespace";
import Validation from "./src/types/namespace/validation.namespace";
import Class from "./src/types/validation/class.type";
import DetailedErrors from "./src/types/validation/detailed-errors.type";
import Errors from "./src/types/validation/errors.type";
import EvaluatedStrategy, {
  FieldStrategy,
  StrategyMandatory,
  StrategyOptional,
} from "./src/types/validation/evaluated-strategy.type";
import Payload from "./src/types/validation/payload.type";
import validators from "./validators";
import Rule from "./validators/any/Rule";

export interface PrimitiveSetAppend {}

export type {
  Class,
  Decorator,
  DescriptorProps,
  DetailedErrors,
  Errors,
  EvaluatedStrategy,
  FieldDescriptorRules,
  FieldStrategy,
  Locale,
  MetaStrategy,
  Payload,
  ReflectionDescriptor,
  ReflectionDescriptorName,
  ReflectionDescriptorThis,
  ReflectionStrategyType,
  StrategyMandatory,
  StrategyOptional,
  TdvCore,
  Validation,
};

export {
  EntityProcessor,
  Locales,
  ReflectionRule,
  ReflectionStrategy,
  Rule,
  ValidationMetaService,
  getClassFieldNames,
  getLocale,
  makeValidator,
  setLocale,
  validators,
};
