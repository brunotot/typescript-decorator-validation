import Required from "../validators/any/Required";
import Rule from "../validators/any/Rule";
import Truthy from "../validators/any/Truthy";
import { valid } from "../validators/any/valid";
import validators from "../validators/index";
import ExactLength from "../validators/string/ExactLength";
import MaxLength from "../validators/string/MaxLength";
import MinLength from "../validators/string/MinLength";
import Password from "../validators/string/Password";
import Email from "../validators/string/regex/impl/Email";
import { DecoratorPartialProps } from "./decorators/types/DecoratorProps.type";
import { setLocale } from "./messages/model/Locale";
import EntityProcessor from "./model/processor/EntityProcessor";
import { StripClass } from "./types/Class.type";
import { TypeGroup } from "./types/namespace/TypeGroup.ns";
import { $ } from "./types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "./utils/decorator.utils";

setLocale("en");

export class SomeClass {
  idk?: string;
}

// prettier-ignore
function ExactCharCount<T extends $.Nullable<string>>(props: DecoratorPartialProps<number>) {
  const key = "ExactCharCount";
  const charCount: number = typeof props === "number" ? props : props.value;
  const defaultMessage = `Text must have exactly ${charCount} characters`
  return Rule<T>({
    groups: extractGroups(props),
    isValid: (v: T) => ({
      key,
      message: extractMessage(props, defaultMessage),
      valid: v?.length === charCount,
    }),
  });
}

export class AddressForm {
  @ExactLength(2)
  @Required()
  @ExactCharCount(10)
  country!: string;
}

export class UserForm2 {
  @MinLength(5)
  @MaxLength(10)
  @Required()
  firstName?: string;

  @MinLength(5)
  @MaxLength(10)
  @Required()
  lastName?: string;

  @Password()
  @Required()
  password?: string;

  @Email()
  @Required()
  email?: string;

  @valid(AddressForm)
  addressForm?: AddressForm;

  someClass?: SomeClass;

  @Truthy()
  get passwordsMatch() {
    return false;
  }
}

type AddressFormType = TypeGroup.Primitive;
//    ^?

export type UserFormFields = {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  url: string;
  age: number;
};

export default class UserForm implements UserFormFields {
  @validators.string.MinLength(5)
  @validators.string.Required()
  firstName!: string;

  @validators.string.Required()
  lastName!: string;

  @validators.string.Required()
  @validators.string.Password()
  password!: string;

  confirmPassword!: string;

  @validators.string.URL()
  url!: string;

  @validators.number.ValueRange({ min: 18, max: 100 })
  age!: number;

  @validators.boolean.Truthy("Passwords must match")
  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}

const dummy: Partial<UserFormFields> = {
  firstName: "",
  lastName: "",
  password: "12345",
  confirmPassword: "",
  url: "",
  age: 10,
};

function main() {
  const processor = new EntityProcessor(UserForm);
  const { errors } = processor.validate(dummy);
  console.log(JSON.stringify(errors, null, 2));
}

main();

type TestType = StripClass<typeof UserForm>;
//    ^?
