import { Negative } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<number>;
const type = "Number";
const identifier = "Negative";
const successData: Type[] = [-1, -5, -10, -1500];
const errorData: Type[] = [1, 5, 10, 1500, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Negative()
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
