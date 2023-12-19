import FunctionStrategyType from "../service/impl/FunctionStrategy/types";
import ObjectArrayGetterStrategyType from "../service/impl/ObjectArrayGetterStrategy/types";
import ObjectArrayStrategyType from "../service/impl/ObjectArrayStrategy/types";
import ObjectGetterStrategyType from "../service/impl/ObjectGetterStrategy/types";
import ObjectStrategyType from "../service/impl/ObjectStrategy/types";
import PrimitiveArrayGetterStrategyType from "../service/impl/PrimitiveArrayGetterStrategy/types";
import PrimitiveArrayStrategyType from "../service/impl/PrimitiveArrayStrategy/types";
import PrimitiveGetterStrategyType from "../service/impl/PrimitiveGetterStrategy/types";
import PrimitiveStrategyType from "../service/impl/PrimitiveStrategy/types";
/**
 * Namespace for grouping different Strategy Types.
 */
var StrategyTypes;
(function (StrategyTypes) {
    StrategyTypes.ObjectArray = ObjectArrayStrategyType;
    StrategyTypes.Object = ObjectStrategyType;
    StrategyTypes.ObjectGetter = ObjectGetterStrategyType;
    StrategyTypes.PrimitiveArray = PrimitiveArrayStrategyType;
    StrategyTypes.Primitive = PrimitiveStrategyType;
    StrategyTypes.PrimitiveGetter = PrimitiveGetterStrategyType;
    StrategyTypes.Function = FunctionStrategyType;
    StrategyTypes.ObjectArrayGetter = ObjectArrayGetterStrategyType;
    StrategyTypes.PrimitiveArrayGetter = PrimitiveArrayGetterStrategyType;
})(StrategyTypes || (StrategyTypes = {}));
export default StrategyTypes;
