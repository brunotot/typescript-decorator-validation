import Class from "../../types/validation/class.type";
import ObjectArrayStrat from "../strategy/impl/object-array.strategy";
import ObjectStrat from "../strategy/impl/object.strategy";
import PrimitiveArrayStrat from "../strategy/impl/primitive-array.strategy";
import PrimitiveStrat from "../strategy/impl/primitive.strategy";
import ValidationStrategy from "../strategy/strategy";

const unknown = "unknown" as const;
const primitive = "primitive" as const;
const composite = "composite" as const;
const primitiveArray = "primitive[]" as const;
const compositeArray = "composite[]" as const;
const primitiveGetter = `get (): ${primitive}` as const;
const compositeGetter = `get (): ${composite}` as const;
const primitiveArrayGetter = `get (): ${primitiveArray}` as const;
const compositeArrayGetter = `get (): ${compositeArray}` as const;
const primitiveFunction = `() => ${primitive}` as const;
const compositeFunction = `() => ${composite}` as const;
const primitiveArrayFunction = `() => ${primitiveArray}` as const;
const compositeArrayFunction = `() => ${compositeArray}` as const;

const ReflectionStrategy = {
  unknown,

  // Primitive
  primitive,
  primitiveGetter,
  primitiveFunction,

  // Composite
  composite,
  compositeGetter,
  compositeFunction,

  // Primitive array
  primitiveArray,
  primitiveArrayFunction,
  primitiveArrayGetter,

  // Composite array
  compositeArray,
  compositeArrayFunction,
  compositeArrayGetter,
} as const;

export type ReflectionStrategyType =
  (typeof ReflectionStrategy)[keyof typeof ReflectionStrategy];

// prettier-ignore
const ReflectionStrategyImpl: Record<ReflectionStrategyType, Class<ValidationStrategy>> = {
    [ReflectionStrategy.primitive]: PrimitiveStrat,
    [ReflectionStrategy.composite]: ObjectStrat,
    [ReflectionStrategy.primitiveArray]: PrimitiveArrayStrat,
    [ReflectionStrategy.compositeArray]: ObjectArrayStrat
  } as any;

export { ReflectionStrategy, ReflectionStrategyImpl };
