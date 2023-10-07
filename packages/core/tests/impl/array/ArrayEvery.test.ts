import { ArrayEvery } from "../../../validators/array/ArrayEvery";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArrayEvery";
const successData: Type[] = [["test", "test123", "123test"]];
const errorData: Type[] = [["test", "tes", "est"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayEvery({ message: "Error", value: (v: string) => v.includes("test") })
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
