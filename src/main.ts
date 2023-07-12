import strategy from "./model/const/Strategy";
import { ValidationHandler, validators } from "..";
import { Locale, setLocale } from "./model/messages/Locale";
import Required from "./decorators/validators/any/Required";
import foreach from "./decorators/validators/array/foreach";
import MinLength from "./decorators/validators/string/MinLength";
import Password from "./decorators/validators/string/Password";
import { TypeGroup } from "./model/type/namespace/TypeGroup.ns";

(Symbol as any).metadata ??= Symbol("Symbol.metadata");
setLocale(Locale.HR);

class SomeClassNew {
  @strategy.primitive()
  @validators.number.Required()
  b?: number;
}

export class SomeClass {
  @strategy.objectArray(() => SomeClassNew)
  @validators.array.ArraySizeExact(2)
  a?: SomeClassNew[];
}

class ParentForm {
  @strategy.primitive(() => String)
  @MinLength(5)
  username!: string;

  @strategy.primitive(() => String)
  @Password()
  password?: string;

  @strategy.primitive(() => Date)
  @validators.date.FutureDate()
  date!: Date;

  @Required()
  @foreach(Required(), MinLength(1))
  @strategy.primitiveArray(() => String)
  emails?: string[];

  @strategy.objectArray(() => SomeClass)
  complex?: SomeClass[];
}

//const handler = new ValidationHandler(ParentForm);
/*const result = handler.validate({
  emails: [""],
  complex: [],
  date: new Date(),
});*/
//console.log(JSON.stringify(result.detailedErrors, null, 2));

export class RandomClass {
  @validators.string.Required()
  @validators.string.Email()
  a?: string;
  @validators.number.Required()
  b?: number;
  @validators.boolean.Truthy()
  c?: boolean;
  @validators.any.Required()
  d!: SomeClass;

  test() {}
}
// TODO: runtime validation for array

type PrimitiveEvaluation = TypeGroup.Primitive;
//    ^?

const handler = new ValidationHandler(RandomClass);
const result = handler.validate({
  a: undefined,
  b: 1,
  c: true,
  d: null as any,
});

result.errors;

console.log(JSON.stringify(result.errors, null, 2));
