import FunctionStrategyType from "./impl/FunctionStrategy/types";
import ObjectArrayGetterStrategyType from "./impl/ObjectArrayGetterStrategy/types";
import ObjectArrayStrategyType from "./impl/ObjectArrayStrategy/types";
import ObjectGetterStrategyType from "./impl/ObjectGetterStrategy/types";
import ObjectStrategyType from "./impl/ObjectStrategy/types";
import PrimitiveArrayGetterStrategyType from "./impl/PrimitiveArrayGetterStrategy/types";
import PrimitiveArrayStrategyType from "./impl/PrimitiveArrayStrategy/types";
import PrimitiveGetterStrategyType from "./impl/PrimitiveGetterStrategy/types";
import PrimitiveStrategyType from "./impl/PrimitiveStrategy/types";

namespace StrategyTypes {
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
