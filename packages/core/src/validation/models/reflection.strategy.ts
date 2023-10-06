import Strategy from "./../../strategy";
import FunctionStrat from "./../../strategy/impl/FunctionStrategy";
import ObjectArrayGetterStrat from "./../../strategy/impl/ObjectArrayGetterStrategy";
import ObjectArrayStrat from "./../../strategy/impl/ObjectArrayStrategy";
import ObjectGetterStrat from "./../../strategy/impl/ObjectGetterStrategy";
import ObjectStrat from "./../../strategy/impl/ObjectStrategy";
import PrimitiveArrayGetterStrat from "./../../strategy/impl/PrimitiveArrayGetterStrategy";
import PrimitiveArrayStrat from "./../../strategy/impl/PrimitiveArrayStrategy";
import PrimitiveGetterStrat from "./../../strategy/impl/PrimitiveGetterStrategy";
import PrimitiveStrat from "./../../strategy/impl/PrimitiveStrategy";
import AbstractValidationStrat from "./../../strategy/strategy";
import Types from "./../../utilities/impl/Types";

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
    unknown: "unknown",
    primitive: Strategy.Types.Primitive.Name,
    primitiveGetter: Strategy.Types.PrimitiveGetter.Name,
    composite: Strategy.Types.Object.Name,
    compositeGetter: Strategy.Types.ObjectGetter.Name,
    primitiveArray: Strategy.Types.PrimitiveArray.Name,
    primitiveArrayGetter: Strategy.Types.PrimitiveArrayGetter.Name,
    compositeArray: Strategy.Types.ObjectArray.Name,
    compositeArrayGetter: Strategy.Types.ObjectArrayGetter.Name,
    function: Strategy.Types.Function.Name,
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
  export const ReflectionStrategyImpl: Record<ReflectionStrategyType, Types.Class<AbstractValidationStrat>> = {
    [ReflectionStrategy.unknown]: (() => {}) as any,
    [ReflectionStrategy.primitive]: PrimitiveStrat,
    [ReflectionStrategy.composite]: ObjectStrat,
    [ReflectionStrategy.primitiveArray]: PrimitiveArrayStrat,
    [ReflectionStrategy.compositeArray]: ObjectArrayStrat,
    [ReflectionStrategy.primitiveGetter]: PrimitiveGetterStrat,
    [ReflectionStrategy.compositeGetter]: ObjectGetterStrat,
    [ReflectionStrategy.primitiveArrayGetter]: PrimitiveArrayGetterStrat,
    [ReflectionStrategy.compositeArrayGetter]: ObjectArrayGetterStrat,
    [ReflectionStrategy.function]: FunctionStrat
  };
}

export default ReflectionStrategy;
