import { EntityProcessor, Rule, setLocale } from "..";
import Required from "../validators/any/Required";
import Truthy from "../validators/any/Truthy";
import { valid } from "../validators/any/valid";
import ExactLength from "../validators/string/ExactLength";
import MaxLength from "../validators/string/MaxLength";
import MinLength from "../validators/string/MinLength";
import Password from "../validators/string/Password";
import Email from "../validators/string/regex/impl/Email";
import { DecoratorPartialProps } from "./decorators/types/DecoratorProps.type";
import { TypeGroup } from "./types/namespace/TypeGroup.ns";
import { $ } from "./types/namespace/Utility.ns";
import { extractGroups, extractMessage } from "./utils/decorator.utils";

setLocale("hr");

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

export class UserForm {
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

function main() {
  const processor = new EntityProcessor(UserForm);
  const result = processor.validate();
  console.log(JSON.stringify(result.errors, null, 2));
}

main();
