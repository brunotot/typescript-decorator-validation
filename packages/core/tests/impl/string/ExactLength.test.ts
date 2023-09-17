import $ from "../../../src/types";
import ExactLength from "../../../validators/string/ExactLength";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Objects.Optional<string>;
const type = "String";
const identifier = "ExactLength";
const successData: Type[] = ["123456", "abcdef"];
const errorData: Type[] = ["", "1", "1234567", undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @ExactLength(6)
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
