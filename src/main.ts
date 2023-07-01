import strategy from "./model/const/Strategy";
import { Rule, ValidationHandler, ValidationResult, validators } from "..";
import { Locale, setLocale } from "./model/messages/Locale";
import PropertyMetadata from "./model/const/PropertyMetadata";
import Required from "./decorators/validators/any/Required";
import foreach from "./decorators/validators/array/foreach";
import MinLength from "./decorators/validators/string/MinLength";
import Password from "./decorators/validators/string/Password";
import { RecursiveComplexType } from "./model/utility/type.utility";

setLocale(Locale.HR);

class SomeClassNew {
  @strategy.primitive()
  @validators.number.Required()
  b?: number;
}

class SomeClass {
  @strategy.objectArray(() => SomeClassNew)
  a?: SomeClassNew[];
}

class ParentForm {
  @strategy.primitive(() => String)
  @MinLength(5)
  username?: string;

  @strategy.primitive(() => String)
  @Password()
  password?: string;

  @strategy.primitive(() => Date)
  @validators.date.FutureDate()
  date?: Date;

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

class RandomClass {
  @validators.string.Required()
  a?: string;
  @validators.number.Required()
  b?: number;
  @validators.boolean.Truthy()
  c?: boolean;
  @strategy.object(() => SomeClass)
  d?: SomeClass;
}

const handler = new ValidationHandler(RandomClass);
const result = handler.validate({
  a: undefined,
  b: 1,
  c: true,
  d: {
    a: [
      {
        b: undefined,
      },
    ],
  },
});
console.log(JSON.stringify(result.errors, null, 2));
