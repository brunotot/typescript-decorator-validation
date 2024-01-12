import { IMock } from "@common/ValidationHandlerMock";
import { ArraySizeRange } from "@src/decorators";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArraySizeRange";
const successData: Type[] = [
  ["1", "2", "3"],
  ["1", "2", "3", "4"],
  ["1", "2", "3", "4", "5"],
];
const errorData: Type[] = [
  ["1", "2"],
  ["1", "2", "3", "4", "5", "6"],
];

/*** Model ***/
class Model implements IMock<Type> {
  @ArraySizeRange(3, 5)
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
