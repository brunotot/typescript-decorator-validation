import $ from "../../../index";
import { Positive } from "../../../validators/number/Positive";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "Positive";
const successData: Type[] = [1, 5, 10, 1500];
const errorData: Type[] = [-1, -5, -10, -1500, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Positive()
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
