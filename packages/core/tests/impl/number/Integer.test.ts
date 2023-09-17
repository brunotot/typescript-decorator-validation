import $ from "../../../src/types";
import Integer from "../../../validators/number/Integer";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Objects.Optional<number>;
const type = "Number";
const identifier = "Integer";
const successData: Type[] = [1, 23, 677];
const errorData: Type[] = [1.15, 250.15, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Integer()
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
