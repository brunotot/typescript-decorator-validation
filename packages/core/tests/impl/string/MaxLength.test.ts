import { IMock } from "@common/ValidationHandlerMock";
import { MaxLength } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<string>;
const type = "String";
const identifier = "MaxLength";
const successData: Type[] = [undefined, null, "12345", "1234567", "1234567890"];
const errorData: Type[] = ["12345678901", "aaaaaaaaaaaaaaaaaa"];

/*** Model ***/
class Model implements IMock<Type> {
  @MaxLength(10)
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
