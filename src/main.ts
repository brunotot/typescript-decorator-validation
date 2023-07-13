import strategy from "./model/const/Strategy";
import { ValidationHandler, validators } from "..";
import { Locale, setLocale } from "./model/messages/Locale";
import Required from "./decorators/validators/any/Required";
import foreach from "./decorators/validators/array/foreach";
import MinLength from "./decorators/validators/string/MinLength";
import Password from "./decorators/validators/string/Password";
import {
  AcceptableDecoratorFieldType,
  Context,
  MetadataType,
} from "./model/type/Context.type";
import MetadataHandler from "./processor/MetadataProcessor";
import MetadataProcessor from "./processor/MetadataProcessor";
import { Nullable } from "./service/ValidatorService";

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

/*function lazy<This, Return>(
  target: (this: This) => Return,
  context: ClassGetterDecoratorContext<This, Return>
) {
  return function (this: This): Return {
    const value = target.call(this);
    Object.defineProperty(this, context.name, { value, enumerable: true });
    return value;
  };
}

// prettier-ignore
type Context =
    | ClassGetterDecoratorContext
    | ClassFieldDecoratorContext
    | ClassMethodDecoratorContext
    ;

function once(handler: () => void) {
  let isExecuted = false;
  return function () {
    if (!isExecuted) {
      handler();
      isExecuted = true;
    }
  };
}

type ClassGetterTargetType<This, Return> = (this: This) => Return;
// prettier-ignore
function buildGetterDecoratorResult<This, Return>(target: ClassGetterTargetType<This, Return>, name: string) {
  const resolveOnInitialCall = once(() => console.log);
  return function (this: This): Return {
    const value = target.call(this);
    Object.defineProperty(this, name, { value, enumerable: true });
    resolveOnInitialCall();
    return value;
  }
}

type ClassMethodTargetType<This, Args extends any[], Return> = (
  this: This,
  ...args: Args
) => Return;
// prettier-ignore
function buildMethodDecoratorResult<This, Args extends any[], Return>(target: ClassMethodTargetType<This, Args, Return>, name: string) {
  const resolveOnInitialCall = once(() => console.log);
  return function (this: This, ...args: Args): Return {
    const value = target.call(this, ...args);
    resolveOnInitialCall();
    return value;
  }
}

type ClassFieldTargetType = undefined;
// prettier-ignore
function buildFieldDecoratorResult<This, Return>(name: string) {
  const resolveOnInitialCall = once(() => console.log);
  return function (this: This, value: Return): Return {
    resolveOnInitialCall();
    return value;
  }
}

type DecoratorTargetType<This, Args extends any[], Return> =
  | ClassGetterTargetType<This, Return>
  | ClassMethodTargetType<This, Args, Return>
  | ClassFieldTargetType;

type ClassFieldDecoratorResult<This, Return> = ReturnType<
  typeof buildFieldDecoratorResult<This, Return>
>;
type ClassMethodDecoratorResult<This, Args extends any[], Return> = ReturnType<
  typeof buildMethodDecoratorResult<This, Args, Return>
>;
type ClassGetterDecoratorResult<This, Return> = ReturnType<
  typeof buildGetterDecoratorResult<This, Return>
>;
type DecoratorTargetResult<This, Args extends any[], Return> =
  | ClassFieldDecoratorResult<This, Return>
  | ClassMethodDecoratorResult<This, Args, Return>
  | ClassGetterDecoratorResult<This, Return>;

// prettier-ignore
function Logger<This, Args extends any[], Return extends NullableType<string>>(target: DecoratorTargetType<This, Args, Return>, context: Context) {

  const name = String(context.name);
  switch (context.kind) {
    case "getter": return buildGetterDecoratorResult(target!, name) 
    case "method": return buildMethodDecoratorResult(target!, name)
    case "field": return buildFieldDecoratorResult(name)
  }
}*/

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

  @validators.any.Required()
  FieldTest?: string;
}
// TODO: runtime validation for array

function main() {
  const handler = new ValidationHandler(RandomClass);
  const result = handler.validate({
    a: undefined,
    b: 1,
    c: true,
    d: null as any,
  });

  console.log(JSON.stringify(result.errors, null, 2));
}

//main();

type asdf = ClassMemberDecoratorContext;

function lorem<T extends AcceptableDecoratorFieldType<string>>(
  _: any,
  context: Context<T>
) {
  const processor = MetadataProcessor.fromContext(context);
  processor.set(context.name, `Hello ${context.name}!`);
}

class TestClass {
  @lorem
  username!: string;
  @lorem
  password!: string;
  @lorem
  age!: string;

  @lorem
  get testString(): string {
    return "";
  }

  @lorem
  testFunction(): string {
    return "";
  }
}

console.log(MetadataProcessor.fromClass(TestClass).get("username"));
