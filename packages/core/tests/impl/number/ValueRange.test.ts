import { ValueRange } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<number>;
const type = "Number";
const identifier = "ValueRange";
const successData: Type[] = [5, 10, 7, null];
const errorData: Type[] = [4, 11, -10, 100];

/*** Model ***/
class Model implements IMock<Type> {
  @ValueRange(5, 10)
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
