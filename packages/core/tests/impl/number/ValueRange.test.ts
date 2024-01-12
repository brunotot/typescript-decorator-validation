import { IMock } from "@common/ValidationHandlerMock";
import { ValueRange } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "ValueRange";
const successData: Type[] = [5, 10, 7, null];
const errorData: Type[] = [4, 11, -10, 100];

/*** Model ***/
class Model implements IMock<Type> {
  @ValueRange(5, 10)
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
