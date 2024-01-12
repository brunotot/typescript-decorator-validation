import { PastDate } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

const NEG_INFINITY = new Date(1990, 0, 1);
const POS_INFINITY = new Date(2099, 11, 31);

/*** Data ***/
type Type = Objects.Optional<Date>;
const type = "Date";
const identifier = "PastDate";
const successData: Type[] = [NEG_INFINITY];
const errorData: Type[] = [POS_INFINITY, undefined, null];

/*** Model ***/
class Model implements IMock<Type> {
  @PastDate()
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
