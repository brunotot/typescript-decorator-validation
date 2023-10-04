import $ from "../../../src/types";
import Length from "../../../validators/string/Length";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Objects.Optional<string>;
const type = "String";
const identifier = "Length";
const successData: Type[] = ["12345", "1234567", "1234567890"];
const errorData: Type[] = ["", "12345678901", "1234", undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Length({ value: [5, 10], message: "Error" })
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
