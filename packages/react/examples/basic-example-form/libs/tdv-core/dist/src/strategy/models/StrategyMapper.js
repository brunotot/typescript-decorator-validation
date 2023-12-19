import Strategy from "..";
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
var StrategyMapper;
(function (StrategyMapper) {
    /**
     * A mapping of reflection strategy types to their corresponding `ValidationStrategy` classes.
     *
     * @remarks
     * This object provides a way to look up the `ValidationStrategy` class that should be used for a given
     * reflection strategy type.
     */
    // prettier-ignore
    StrategyMapper.data = {
        unknown: (() => { }),
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
})(StrategyMapper || (StrategyMapper = {}));
export default StrategyMapper;
