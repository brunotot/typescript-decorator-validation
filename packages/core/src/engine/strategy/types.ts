import ObjectArrayStrategyTypes from "./impl/ObjectArrayStrategy/types";
import ObjectStrategyTypes from "./impl/ObjectStrategy/types";
import PrimitiveArrayStrategyTypes from "./impl/PrimitiveArrayStrategy/types";
import PrimitiveStrategyTypes from "./impl/PrimitiveStrategy/types";

namespace StrategyTypes {
  export import ObjectArray = ObjectArrayStrategyTypes;
  export import Object = ObjectStrategyTypes;
  export import PrimitiveArray = PrimitiveArrayStrategyTypes;
  export import Primitive = PrimitiveStrategyTypes;
}

export default StrategyTypes;
