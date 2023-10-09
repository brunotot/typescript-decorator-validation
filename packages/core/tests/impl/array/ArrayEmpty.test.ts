import { ArrayEmpty } from "../../../collection/array/ArrayEmpty";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = any[];
const type = "Array<any>";
const identifier = "ArrayEmpty";
const successData: Type[] = [[]];
const errorData: Type[] = [["test"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayEmpty()
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
