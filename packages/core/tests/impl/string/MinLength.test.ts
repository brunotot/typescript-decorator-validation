import { MinLength } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<string>;
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
