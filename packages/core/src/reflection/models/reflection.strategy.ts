import ObjectArrayStrat from "../../engine/strategy/impl/ObjectArrayStrategy";
import ObjectArrayStrategyType from "../../engine/strategy/impl/ObjectArrayStrategy/types";
import ObjectStrat from "../../engine/strategy/impl/ObjectStrategy";
import ObjectStrategyType from "../../engine/strategy/impl/ObjectStrategy/types";
import PrimitiveArrayStrat from "../../engine/strategy/impl/PrimitiveArrayStrategy";
import PrimitiveArrayStrategyType from "../../engine/strategy/impl/PrimitiveArrayStrategy/types";
import PrimitiveGetterStrategyType from "../../engine/strategy/impl/PrimitiveGetterStrategy/types";
import PrimitiveStrat from "../../engine/strategy/impl/PrimitiveStrategy";
import PrimitiveStrategyType from "../../engine/strategy/impl/PrimitiveStrategy/types";
import ValidationStrategy from "../../engine/strategy/strategy";
import Types from "../../types/namespace/types.namespace";

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
 * A namespace responsible for exposing reflection-strategy-specific methods and types
 */
namespace ReflectionStrategy {
  /**
   * A mapping of reflection strategy types to their string representations.
   *
   * @remarks
   * This object defines the various strategies that can be used for reflection.
   * It includes strategies for primitives, composites, and their arrays, as well as
   * strategies for getters and functions that return these types.
   */
  export const ReflectionStrategy = {
    unknown,

    // Primitive
    primitive: PrimitiveStrategyType.Name,
    primitiveGetter: PrimitiveGetterStrategyType.Name,
    primitiveFunction,

    // Composite
    composite: ObjectStrategyType.Name,
    compositeGetter,
    compositeFunction,

    // Primitive array
    primitiveArray: PrimitiveArrayStrategyType.Name,
    primitiveArrayFunction,
    primitiveArrayGetter,

    // Composite array
    compositeArray: ObjectArrayStrategyType.Name,
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
  export const ReflectionStrategyImpl: Record<ReflectionStrategyType, Types.Class<ValidationStrategy>> = {
    [ReflectionStrategy.primitive]: PrimitiveStrat,
    [ReflectionStrategy.composite]: ObjectStrat,
    [ReflectionStrategy.primitiveArray]: PrimitiveArrayStrat,
    [ReflectionStrategy.compositeArray]: ObjectArrayStrat
  } as any;
}

export default ReflectionStrategy;
