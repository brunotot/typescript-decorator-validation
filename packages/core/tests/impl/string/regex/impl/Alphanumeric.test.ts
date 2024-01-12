import { IMock } from "@common/ValidationHandlerMock";
import { Alphanumeric } from "@src/decorators";
import { Objects } from "@src/utilities";
import { standardTest } from "../../../../common/TestFactory";

/*** Data ***/
type Type = Objects.Optional<string>;
const type = "String";
const identifier = "Alphanumeric";
const successData: Type[] = ["123abcdef", null, undefined, ""];
const errorData: Type[] = ["123abc!=?"];

/*** Model ***/
class Model implements IMock<Type> {
  @Alphanumeric()
  value: Type;
}

/*** Test ***/
standardTest({
  Model,
  errorData,
  identifier,
  successData,
  type,
});
