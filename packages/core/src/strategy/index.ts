import StrategyFactoryNamespace from "./factory";
import StrategyTypesNamespace from "./types";

namespace Strategy {
  export import Types = StrategyTypesNamespace;

  export import Factory = StrategyFactoryNamespace;
}

export default Strategy;
