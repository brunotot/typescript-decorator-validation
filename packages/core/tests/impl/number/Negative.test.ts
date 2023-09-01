import { $ } from "../../../src/types/namespace/Utility.ns";
import Negative from "../../../validators/number/Negative";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Nullable<number>;
const type = "Number";
const identifier = "Negative";
const successData: Type[] = [-1, -5, -10, -1500];
const errorData: Type[] = [1, 5, 10, 1500, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Negative()
  value: Type;
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
