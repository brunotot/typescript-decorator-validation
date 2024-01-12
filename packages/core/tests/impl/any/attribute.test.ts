import { Integer, Required, attribute } from "@decorators";
import { Objects } from "@utilities";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = Objects.Optional<NestedModel>;
const type = "Nested form";
const identifier = "valid";
const successData: Type[] = [
  {
    numberValue: 1,
    stringValue: "test",
  },
];
const errorData: Type[] = [
  null,
  undefined,
  {
    numberValue: 1.5,
    stringValue: "",
  },
  {
    numberValue: 1,
    stringValue: "",
  },
  {
    numberValue: 1.5,
    stringValue: "test",
  },
];

class NestedModel {
  @Required()
  stringValue!: string;

  @Integer()
  numberValue!: number;
}

/*** Model ***/
class Model implements IMock<Type> {
  @attribute(NestedModel)
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
