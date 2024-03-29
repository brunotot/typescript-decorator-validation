import { Digits } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<number>;
const type = "Number";
const identifier = "Digits";
const successData: Type[] = [1.123, 12.1234, undefined, null];
const errorData: Type[] = [123.12345, 12.12345, 123.1234];

/*** Model ***/
class Model implements IMock<Type> {
  @Digits(2, 4)
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
