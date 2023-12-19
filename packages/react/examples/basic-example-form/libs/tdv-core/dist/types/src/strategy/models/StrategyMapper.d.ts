import Strategy from "..";
import type Types from "../../utilities/impl/Types";
import { type AbstractValidationStrategyService } from "../service/AbstractValidationStrategyService";
/**
 * A namespace responsible for exposing reflection-strategy-specific methods and types
 */
declare namespace StrategyMapper {
    /**
     * The type of a reflection strategy.
     *
     * @remarks
     * This type is derived from the keys of the `ReflectionStrategy` object.
     */
    type Key = "unknown" | typeof Strategy.Types.Primitive.Name | typeof Strategy.Types.Object.Name | typeof Strategy.Types.PrimitiveArray.Name | typeof Strategy.Types.ObjectArray.Name | typeof Strategy.Types.PrimitiveGetter.Name | typeof Strategy.Types.ObjectGetter.Name | typeof Strategy.Types.PrimitiveArrayGetter.Name | typeof Strategy.Types.ObjectArrayGetter.Name | typeof Strategy.Types.Function.Name;
    /**
     * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
     *
     * @remarks
     * This object provides a way to look up the `ValidationStrategy` class that should be used for a given
     * reflection strategy type.
     */
    const data: Record<Key, Types.Class<AbstractValidationStrategyService>>;
}
export default StrategyMapper;
//# sourceMappingURL=StrategyMapper.d.ts.map