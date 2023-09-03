import { $ } from "../../../src/types/namespace/Utility.ns";
import ValueMax from "../../../validators/number/ValueMax";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Nullable<number>;
const type = "Number";
const identifier = "ValueMax";
const successData: Type[] = [1, 5, 7, 10, undefined, null];
const errorData: Type[] = [11, 20, 300];

/*** Model ***/
class Model implements IMock<Type> {
  @ValueMax(10)
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