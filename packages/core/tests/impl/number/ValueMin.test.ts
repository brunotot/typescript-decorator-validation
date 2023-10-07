import $ from "../../../index";
import { ValueMin } from "../../../validators/number/ValueMin";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "ValueMin";
const successData: Type[] = [10, 15, 20, 100, undefined, null];
const errorData: Type[] = [-1, -5, 5, 8];

/*** Model ***/
class Model implements IMock<Type> {
  @ValueMin(10)
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
