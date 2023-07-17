import { Rule, ValidationHandler, setLocale } from "..";
import Required from "../validators/any/Required";
import Truthy from "../validators/any/Truthy";
import { valid } from "../validators/any/valid";
import Email from "../validators/string/Email";
import ExactLength from "../validators/string/ExactLength";
import MaxLength from "../validators/string/MaxLength";
import MinLength from "../validators/string/MinLength";
import Password from "../validators/string/Password";
import { TypeGroup } from "./model/type/namespace/TypeGroup.ns";
import { Nullable } from "./model/utility/type.utility";

setLocale("hr");

export class SomeClass {
  idk?: string;
}

function CustomRule<T extends Nullable<string>>(charCount: number = 5) {
  return Rule<T>({
    groups: [],
    isValid: (v: T) => ({
      key: "CustomRule",
      message: `Text must have exactly ${charCount} characters`,
      valid: v?.length === charCount,
    }),
  });
}

export class AddressForm {
  @ExactLength(2)
  @Required()
  @CustomRule()
  country?: string;
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
  const handler = new ValidationHandler(UserForm);
  const result = handler.validate();
  console.log(JSON.stringify(result.errors, null, 2));
}

main();
