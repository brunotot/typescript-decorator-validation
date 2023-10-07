import Strategy from "..";
import Types from "../../utilities/impl/Types";
import { AbstractValidationStrategyService } from "../service/AbstractValidationStrategyService";
import { FunctionStrat } from "../service/impl/FunctionStrategy";
import { ObjectArrayGetterStrat } from "../service/impl/ObjectArrayGetterStrategy";
import { ObjectArrayStrat } from "../service/impl/ObjectArrayStrategy";
import { ObjectGetterStrat } from "../service/impl/ObjectGetterStrategy";
import { ObjectStrat } from "../service/impl/ObjectStrategy";
import { PrimitiveArrayGetterStrat } from "../service/impl/PrimitiveArrayGetterStrategy";
import { PrimitiveArrayStrat } from "../service/impl/PrimitiveArrayStrategy";
import { PrimitiveGetterStrat } from "../service/impl/PrimitiveGetterStrategy";
import { PrimitiveStrat } from "../service/impl/PrimitiveStrategy";

/**
 * A namespace responsible for exposing reflection-strategy-specific methods and types
 */
namespace StrategyMapper {
  /**
   * The type of a reflection strategy.
   *
   * @remarks
   * This type is derived from the keys of the `ReflectionStrategy` object.
   */
  export type Key =
    | "unknown"
    | typeof Strategy.Types.Primitive.Name
    | typeof Strategy.Types.Object.Name
    | typeof Strategy.Types.PrimitiveArray.Name
    | typeof Strategy.Types.ObjectArray.Name
    | typeof Strategy.Types.PrimitiveGetter.Name
    | typeof Strategy.Types.ObjectGetter.Name
    | typeof Strategy.Types.PrimitiveArrayGetter.Name
    | typeof Strategy.Types.ObjectArrayGetter.Name
    | typeof Strategy.Types.Function.Name;

  /**
   * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
   *
   * @remarks
   * This object provides a way to look up the `ValidationStrategy` class that should be used for a given
   * reflection strategy type.
   */
  // prettier-ignore
  export const data: Record<Key, Types.Class<AbstractValidationStrategyService>> = {
    unknown: (() => {}) as any,
    [Strategy.Types.Primitive.Name]: PrimitiveStrat,
    [Strategy.Types.Object.Name]: ObjectStrat,
    [Strategy.Types.PrimitiveArray.Name]: PrimitiveArrayStrat,
    [Strategy.Types.ObjectArray.Name]: ObjectArrayStrat,
    [Strategy.Types.PrimitiveGetter.Name]: PrimitiveGetterStrat,
    [Strategy.Types.ObjectGetter.Name]: ObjectGetterStrat,
    [Strategy.Types.PrimitiveArrayGetter.Name]: PrimitiveArrayGetterStrat,
    [Strategy.Types.ObjectArrayGetter.Name]: ObjectArrayGetterStrat,
    [Strategy.Types.Function.Name]: FunctionStrat
  };
}

export default StrategyMapper;
