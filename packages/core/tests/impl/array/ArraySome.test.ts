import ArraySome from "../../../validators/array/ArraySome";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArraySome";
const successData: Type[] = [["test", "tes", "123tes", "tes123"]];
const errorData: Type[] = [["tes123", "tes", "123tes"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArraySome({ message: "Error", value: (v: string) => v.includes("test") })
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
