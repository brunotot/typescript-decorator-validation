import { ArraySizeMax } from "../../../validators/array/ArraySizeMax";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArraySizeMax";
const successData: Type[] = [
  ["1", "2", "3", "abc", "def"],
  ["1", "2", "3", "4"],
];
const errorData: Type[] = [["1", "2", "3", "4", "5", "6"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArraySizeMax(5)
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
