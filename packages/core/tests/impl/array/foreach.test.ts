import { foreach } from "../../../collection/array/foreach";
import { Integer } from "../../../collection/number/Integer";
import { Email } from "../../../collection/string/regex/impl/Email";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = string[];
const type = "Array<string>";
const identifier = "foreach";
const successData: Type[] = [["1", "2", "3"], []];
const errorData: Type[] = [["", "2", "3"]];

/*** Model ***/
class Model implements IMock<Type> {
  @foreach(Integer(), Email())
  value: string[] = [];
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
