import Decorator from "./src/decorators";
import Localization from "./src/localization";
import EntityProcessor from "./src/processor";
import CacheMap from "./src/processor/models/cache.map";
import ObjectArrayStrat, {
  ObjectArrayDetailedErrors,
  ObjectArraySimpleErrors,
} from "./src/processor/strategy/impl/object-array.strategy";
import ObjectStrat, {
  ObjectDetailedErrors,
  ObjectSimpleErrors,
} from "./src/processor/strategy/impl/object.strategy";
import PrimitiveArrayStrat, {
  PrimitiveArrayDetailedErrors,
  PrimitiveArraySimpleErrors,
} from "./src/processor/strategy/impl/primitive-array.strategy";
import PrimitiveStrat from "./src/processor/strategy/impl/primitive.strategy";
import ValidationStrategy from "./src/processor/strategy/strategy";
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
  CacheMap,
  Class,
  Decorator,
  DescriptorProps,
  DetailedErrors,
  Errors,
  EvaluatedStrategy,
  FieldDescriptorRules,
  FieldStrategy,
  Localization,
  MetaStrategy,
  ObjectArrayDetailedErrors,
  ObjectArraySimpleErrors,
  ObjectDetailedErrors,
  ObjectSimpleErrors,
  Payload,
  PrimitiveArrayDetailedErrors,
  PrimitiveArraySimpleErrors,
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
  ObjectArrayStrat,
  ObjectStrat,
  PrimitiveArrayStrat,
  PrimitiveStrat,
  ReflectionRule,
  ReflectionStrategy,
  Rule,
  ValidationMetaService,
  ValidationStrategy,
  getClassFieldNames,
  validators,
};
