import { $ } from "../../../src/types/namespace/Utility.ns";
import ValueRange from "../../../validators/number/ValueRange";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Nullable<number>;
const type = "Number";
const identifier = "ValueRange";
const successData: Type[] = [5, 10, 7, null];
const errorData: Type[] = [4, 11, -10, 100];

/*** Model ***/
class Model implements IMock<Type> {
  @ValueRange({ min: 5, max: 10 })
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
