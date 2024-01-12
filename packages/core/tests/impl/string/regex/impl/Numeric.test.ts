import { Numeric } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<string>;
const type = "String";
const identifier = "Numeric";
const successData: Type[] = ["123456", "", null, undefined];
const errorData: Type[] = ["test123", "test", "123test"];

/*** Model ***/
class Model implements IMock<Type> {
  @Numeric()
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
