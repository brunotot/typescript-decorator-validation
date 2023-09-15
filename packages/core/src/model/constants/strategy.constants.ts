import { Class } from "../../types/Class.type";
import ObjectArrayStrat from "../../validation/impl/object-array.strategy";
import ObjectStrat from "../../validation/impl/object.strategy";
import PrimitiveArrayStrat from "../../validation/impl/primitive-array.strategy";
import PrimitiveStrat from "../../validation/impl/primitive.strategy";
import ValidationStrategy from "../../validation/strategy";
import { PropertyTypeGroup } from "../descriptor/field.descriptor";

// prettier-ignore
const StrategyConst: Record<PropertyTypeGroup, Class<ValidationStrategy>> = {
  "PRIMITIVE_ARRAY": PrimitiveArrayStrat,
     "OBJECT_ARRAY": ObjectArrayStrat,
        "PRIMITIVE": PrimitiveStrat,
           "OBJECT": ObjectStrat,
};

export default StrategyConst;
