import $ from "../../../src/types";
import validators from "../../../validators";
import valid from "../../../validators/any/valid";
import { standardTest } from "../../common/TestFactory";
import { IMock } from "../../common/ValidationHandlerMock";

/*** Data ***/
type Type = $.Objects.Optional<NestedModel>;
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
  @validators.string.Required()
  stringValue!: string;

  @validators.number.Integer()
  numberValue!: number;
}

/*** Model ***/
class Model implements IMock<Type> {
  @valid(NestedModel)
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
