import ObjectArrayStrat from "../../processor/strategy/impl/object-array.strategy";
import ObjectStrat from "../../processor/strategy/impl/object.strategy";
import PrimitiveArrayStrat from "../../processor/strategy/impl/primitive-array.strategy";
import PrimitiveStrat from "../../processor/strategy/impl/primitive.strategy";
import ValidationStrategy from "../../processor/strategy/strategy";
import Class from "../../types/validation/class.type";

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

/**
 * A mapping of reflection strategy types to their string representations.
 *
 * @remarks
 * This object defines the various strategies that can be used for reflection.
 * It includes strategies for primitives, composites, and their arrays, as well as
 * strategies for getters and functions that return these types.
 */
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

/**
 * The type of a reflection strategy.
 *
 * @remarks
 * This type is derived from the keys of the `ReflectionStrategy` object.
 */
export type ReflectionStrategyType =
  (typeof ReflectionStrategy)[keyof typeof ReflectionStrategy];

/**
 * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
 *
 * @remarks
 * This object provides a way to look up the `ValidationStrategy` class that should be used for a given
 * reflection strategy type.
 */
// prettier-ignore
const ReflectionStrategyImpl: Record<ReflectionStrategyType, Class<ValidationStrategy>> = {
  [ReflectionStrategy.primitive]: PrimitiveStrat,
  [ReflectionStrategy.composite]: ObjectStrat,
  [ReflectionStrategy.primitiveArray]: PrimitiveArrayStrat,
  [ReflectionStrategy.compositeArray]: ObjectArrayStrat
} as any;

export { ReflectionStrategy, ReflectionStrategyImpl };
