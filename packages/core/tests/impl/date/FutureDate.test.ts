import $ from "../../../index";
import { FutureDate } from "../../../src/decorators";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

const NEG_INFINITY = new Date(1990, 0, 1);
const POS_INFINITY = new Date(2099, 11, 31);

/*** Data ***/
type Type = $.Utilities.Objects.Optional<Date>;
const type = "Date";
const identifier = "FutureDate";
const successData: Type[] = [POS_INFINITY];
const errorData: Type[] = [new Date(), NEG_INFINITY, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @FutureDate()
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
