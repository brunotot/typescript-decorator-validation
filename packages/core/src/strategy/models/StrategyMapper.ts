import type * as Types from "../../utilities/impl/Types";
import { type AbstractValidationStrategyService } from "../service/AbstractValidationStrategyService";
import { FunctionStrat } from "../service/impl/FunctionStrategy";
import { ObjectArrayGetterStrat } from "../service/impl/ObjectArrayGetterStrategy";
import { ObjectArrayStrat } from "../service/impl/ObjectArrayStrategy";
import { ObjectGetterStrat } from "../service/impl/ObjectGetterStrategy";
import { ObjectStrat } from "../service/impl/ObjectStrategy";
import { PrimitiveArrayGetterStrat } from "../service/impl/PrimitiveArrayGetterStrategy";
import { PrimitiveArrayStrat } from "../service/impl/PrimitiveArrayStrategy";
import { PrimitiveGetterStrat } from "../service/impl/PrimitiveGetterStrategy";
import { PrimitiveStrat } from "../service/impl/PrimitiveStrategy";
import * as StrategyTypes from "./StrategyTypes";

/**
 * The type of a reflection strategy.
 *
 * @remarks
 * This type is derived from the keys of the `ReflectionStrategy` object.
 */
export type Key =
  | "unknown"
  | typeof StrategyTypes.Primitive.Name
  | typeof StrategyTypes.Object.Name
  | typeof StrategyTypes.PrimitiveArray.Name
  | typeof StrategyTypes.ObjectArray.Name
  | typeof StrategyTypes.PrimitiveGetter.Name
  | typeof StrategyTypes.ObjectGetter.Name
  | typeof StrategyTypes.PrimitiveArrayGetter.Name
  | typeof StrategyTypes.ObjectArrayGetter.Name
  | typeof StrategyTypes.Function.Name;

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
    [StrategyTypes.Primitive.Name]: PrimitiveStrat,
    [StrategyTypes.Object.Name]: ObjectStrat,
    [StrategyTypes.PrimitiveArray.Name]: PrimitiveArrayStrat,
    [StrategyTypes.ObjectArray.Name]: ObjectArrayStrat,
    [StrategyTypes.PrimitiveGetter.Name]: PrimitiveGetterStrat,
    [StrategyTypes.ObjectGetter.Name]: ObjectGetterStrat,
    [StrategyTypes.PrimitiveArrayGetter.Name]: PrimitiveArrayGetterStrat,
    [StrategyTypes.ObjectArrayGetter.Name]: ObjectArrayGetterStrat,
    [StrategyTypes.Function.Name]: FunctionStrat
  };
