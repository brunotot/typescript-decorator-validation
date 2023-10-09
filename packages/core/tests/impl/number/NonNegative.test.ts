import { NonNegative } from "../../../collection/number/NonNegative";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "NonNegative";
const successData: Type[] = [0, 1, 5, 10, 1500];
const errorData: Type[] = [-1, -5, -10, -1500, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @NonNegative()
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
