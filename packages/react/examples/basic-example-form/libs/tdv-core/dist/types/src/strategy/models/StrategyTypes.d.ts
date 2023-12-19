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
declare namespace StrategyTypes {
    export import ObjectArray = ObjectArrayStrategyType;
    export import Object = ObjectStrategyType;
    export import ObjectGetter = ObjectGetterStrategyType;
    export import PrimitiveArray = PrimitiveArrayStrategyType;
    export import Primitive = PrimitiveStrategyType;
    export import PrimitiveGetter = PrimitiveGetterStrategyType;
    export import Function = FunctionStrategyType;
    export import ObjectArrayGetter = ObjectArrayGetterStrategyType;
    export import PrimitiveArrayGetter = PrimitiveArrayGetterStrategyType;
}
export default StrategyTypes;
//# sourceMappingURL=StrategyTypes.d.ts.map