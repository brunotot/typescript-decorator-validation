import { Uppercase } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<string>;
const type = "String";
const identifier = "Uppercase";
const successData: Type[] = ["TEST", "", null, undefined];
const errorData: Type[] = ["Test123", "tesT123", "TEST123"];

/*** Model ***/
class Model implements IMock<Type> {
  @Uppercase()
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
