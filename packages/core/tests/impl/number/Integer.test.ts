import { IMock } from "@common/ValidationHandlerMock";
import { Integer } from "@src/decorators";
import $ from "../../../index";
import { standardTest } from "../../common/TestFactory";

/*** Data ***/
type Type = $.Utilities.Objects.Optional<number>;
const type = "Number";
const identifier = "Integer";
const successData: Type[] = [1, 23, 677];
const errorData: Type[] = [1.15, 250.15, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @Integer()
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
