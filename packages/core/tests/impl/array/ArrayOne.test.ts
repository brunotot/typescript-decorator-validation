import { ArrayOne } from "@decorators";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArrayOne";
const successData: Type[] = [["test", "tes", "123tes", "tes123"]];
const errorData: Type[] = [["test123", "tes", "123test"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayOne((v: string) => v.includes("test"), { message: "Error" })
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
