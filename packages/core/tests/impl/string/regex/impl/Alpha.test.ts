import { Alpha } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../../../common/TestFactory";
import { IMock } from "../../../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<string>;
const type = "String";
const identifier = "Alpha";
const successData: Type[] = ["abcdef", null, undefined];
const errorData: Type[] = ["1", "123", "a1", "abc1"];

/*** Model ***/
class Model implements IMock<Type> {
  @Alpha()
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
