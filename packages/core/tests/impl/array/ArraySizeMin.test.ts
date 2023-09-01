import ArraySizeMin from "../../../validators/array/ArraySizeMin";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArraySizeMin";
const successData: Type[] = [["1", "2", "3", "abc", "def"]];
const errorData: Type[] = [["1", "2", "3", "3"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArraySizeMin(5)
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
