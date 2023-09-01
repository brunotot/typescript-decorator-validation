import ArrayUnique from "../../../validators/array/ArrayUnique";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArrayUnique";
const successData: Type[] = [["1", "2", "3", "abc", "def"]];
const errorData: Type[] = [["1", "2", "3", "3", "abc", "def"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayUnique()
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
