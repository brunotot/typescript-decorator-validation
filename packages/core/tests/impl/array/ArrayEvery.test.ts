import { IMock } from "@common/ValidationHandlerMock";
import { ArrayEvery } from "@src/decorators";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "ArrayEvery";
const successData: Type[] = [["test", "test123", "123test"]];
const errorData: Type[] = [["test", "tes", "est"]];

/*** Model ***/
class Model implements IMock<Type> {
  @ArrayEvery((v: string) => v.includes("test"), { message: "Error" })
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
