import { IMock } from "../../common/ValidationHandlerMock";
import { standardTest } from "../../common/TestFactory";
import { $ } from "../../../src/types/namespace/Utility.ns";
import ExactLength from "../../../validators/string/ExactLength";

/*** Data ***/
type Type = $.Nullable<string>;
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
