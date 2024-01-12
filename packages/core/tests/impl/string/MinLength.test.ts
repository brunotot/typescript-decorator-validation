import { IMock } from "@common/ValidationHandlerMock";
import { MinLength } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "MinLength";
const successData: Type[] = ["1234567890", "aaaaaaaaaaaaaaaaaaaa"];
const errorData: Type[] = ["", null, undefined, "12345", "aaa"];

/*** Model ***/
class Model implements IMock<Type> {
  @MinLength(10)
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
