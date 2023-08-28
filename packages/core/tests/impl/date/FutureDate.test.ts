import { $ } from "../../../src/types/namespace/Utility.ns";
import FutureDate from "../../../validators/date/FutureDate";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

const NEG_INFINITY = new Date(1990, 0, 1);
const POS_INFINITY = new Date(2099, 11, 31);

/*** Data ***/
type Type = $.Nullable<Date>;
const type = "Date";
const identifier = "FutureDate";
const successData: Type[] = [POS_INFINITY, undefined, null];
const errorData: Type[] = [new Date(), NEG_INFINITY];

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
