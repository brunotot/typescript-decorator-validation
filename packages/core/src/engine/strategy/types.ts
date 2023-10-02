import ObjectArrayStrategyType from "./impl/ObjectArrayStrategy/types";
import ObjectStrategyType from "./impl/ObjectStrategy/types";
import PrimitiveArrayStrategyType from "./impl/PrimitiveArrayStrategy/types";
import PrimitiveGetterStrategyType from "./impl/PrimitiveGetterStrategy/types";
import PrimitiveStrategyType from "./impl/PrimitiveStrategy/types";

namespace StrategyTypes {
  export import ObjectArray = ObjectArrayStrategyType;
  export import Object = ObjectStrategyType;
  export import PrimitiveArray = PrimitiveArrayStrategyType;
  export import Primitive = PrimitiveStrategyType;
  export import PrimitiveGetter = PrimitiveGetterStrategyType;
}

export default StrategyTypes;
