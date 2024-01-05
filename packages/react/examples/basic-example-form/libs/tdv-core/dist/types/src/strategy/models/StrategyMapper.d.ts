import type * as Types from "../../utilities/impl/Types";
import { type AbstractValidationStrategyService } from "../service/AbstractValidationStrategyService";
import * as StrategyTypes from "./StrategyTypes";
/**
 * The type of a reflection strategy.
 *
 * @remarks
 * This type is derived from the keys of the `ReflectionStrategy` object.
 */
export type Key = "unknown" | typeof StrategyTypes.Primitive.Name | typeof StrategyTypes.Object.Name | typeof StrategyTypes.PrimitiveArray.Name | typeof StrategyTypes.ObjectArray.Name | typeof StrategyTypes.PrimitiveGetter.Name | typeof StrategyTypes.ObjectGetter.Name | typeof StrategyTypes.PrimitiveArrayGetter.Name | typeof StrategyTypes.ObjectArrayGetter.Name | typeof StrategyTypes.Function.Name;
/**
 * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
 *
 * @remarks
 * This object provides a way to look up the `ValidationStrategy` class that should be used for a given
 * reflection strategy type.
 */
export declare const data: Record<Key, Types.Class<AbstractValidationStrategyService>>;
//# sourceMappingURL=StrategyMapper.d.ts.map