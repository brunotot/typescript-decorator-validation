import ArrayNone from "../../../validators/array/ArrayNone";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArrayNone";
const successData: Type[] = [["est", "tes", "123tes", "tes123"]];
const errorData: Type[] = [["est", "test", "123test"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayNone({ message: "Error", test: (v: string) => v.includes("test") })
  value!: Type;
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
