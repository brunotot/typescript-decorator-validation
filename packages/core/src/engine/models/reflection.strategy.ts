import Types from "../../types/namespace/types.namespace";
import FunctionStrat from "../strategy/impl/FunctionStrategy";
import FunctionStrategyType from "../strategy/impl/FunctionStrategy/types";
import ObjectArrayGetterStrategy from "../strategy/impl/ObjectArrayGetterStrategy";
import ObjectArrayGetterStrategyType from "../strategy/impl/ObjectArrayGetterStrategy/types";
import ObjectArrayStrat from "../strategy/impl/ObjectArrayStrategy";
import ObjectArrayStrategyType from "../strategy/impl/ObjectArrayStrategy/types";
import ObjectGetterStrat from "../strategy/impl/ObjectGetterStrategy";
import ObjectGetterStrategyType from "../strategy/impl/ObjectGetterStrategy/types";
import ObjectStrat from "../strategy/impl/ObjectStrategy";
import ObjectStrategyType from "../strategy/impl/ObjectStrategy/types";
import PrimitiveArrayGetterStrat from "../strategy/impl/PrimitiveArrayGetterStrategy";
import PrimitiveArrayGetterStrategyType from "../strategy/impl/PrimitiveArrayGetterStrategy/types";
import PrimitiveArrayStrat from "../strategy/impl/PrimitiveArrayStrategy";
import PrimitiveArrayStrategyType from "../strategy/impl/PrimitiveArrayStrategy/types";
import PrimitiveGetterStrat from "../strategy/impl/PrimitiveGetterStrategy";
import PrimitiveGetterStrategyType from "../strategy/impl/PrimitiveGetterStrategy/types";
import PrimitiveStrat from "../strategy/impl/PrimitiveStrategy";
import PrimitiveStrategyType from "../strategy/impl/PrimitiveStrategy/types";
import ValidationStrategy from "../strategy/strategy";

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
    primitive: PrimitiveStrategyType.Name,
    primitiveGetter: PrimitiveGetterStrategyType.Name,
    composite: ObjectStrategyType.Name,
    compositeGetter: ObjectGetterStrategyType.Name,
    primitiveArray: PrimitiveArrayStrategyType.Name,
    primitiveArrayGetter: PrimitiveArrayGetterStrategyType.Name,
    compositeArray: ObjectArrayStrategyType.Name,
    compositeArrayGetter: ObjectArrayGetterStrategyType.Name,
    function: FunctionStrategyType.Name,
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
    [ReflectionStrategy.unknown]: (() => {}) as any,
    [ReflectionStrategy.primitive]: PrimitiveStrat,
    [ReflectionStrategy.composite]: ObjectStrat,
    [ReflectionStrategy.primitiveArray]: PrimitiveArrayStrat,
    [ReflectionStrategy.compositeArray]: ObjectArrayStrat,
    [ReflectionStrategy.primitiveGetter]: PrimitiveGetterStrat,
    [ReflectionStrategy.compositeGetter]: ObjectGetterStrat,
    [ReflectionStrategy.primitiveArrayGetter]: PrimitiveArrayGetterStrat,
    [ReflectionStrategy.compositeArrayGetter]: ObjectArrayGetterStrategy,
    [ReflectionStrategy.function]: FunctionStrat
  };
}

export default ReflectionStrategy;
