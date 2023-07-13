import strategy from "./model/const/Strategy";
import { ValidationHandler, validators } from "..";
import { Locale, setLocale } from "./model/messages/Locale";

setLocale(Locale.HR);

class SomeClassNew {
  @validators.number.Required()
  b?: number;
}

export class SomeClass {
  @validators.array.ArraySizeExact(2)
  a?: SomeClassNew[];
}

export class RandomClass {
  @validators.string.Email()
  @validators.string.Required()
  a?: string;
  @validators.number.Required()
  b?: number;
  @validators.boolean.Truthy()
  c?: boolean;
  @validators.any.Required()
  d!: SomeClass;
  @validators.array.Required()
  @validators.array.foreach(validators.string.Email())
  e!: string[];

  @validators.string.Required()
  f(): string {
    return "";
  }
}
// TODO: runtime validation for array
// TODO LIBRARY ZA VIZUALIZACIJU CMD texta mozda?

function main() {
  const handler = new ValidationHandler(RandomClass);
  const result = handler.validate({
    a: "asd",
    b: 1,
    c: false,
    d: null as any,
    e: [],
  });

  console.log(JSON.stringify(result.errors, null, 2));
}

main();
