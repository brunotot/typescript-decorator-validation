import { ValidationHandler, setLocale } from "..";
import Required from "../validators/impl/any/Required";
import Truthy from "../validators/impl/any/Truthy";
import { valid } from "../validators/impl/any/valid";
import Email from "../validators/impl/string/Email";
import ExactLength from "../validators/impl/string/ExactLength";
import MaxLength from "../validators/impl/string/MaxLength";
import MinLength from "../validators/impl/string/MinLength";
import Password from "../validators/impl/string/Password";
import { TypeGroup } from "./model/type/namespace/TypeGroup.ns";

setLocale("hr");

export class SomeClass {
  idk?: string;
}

export class AddressForm {
  @ExactLength(2)
  @Required()
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

  result.errors.addressForm.country;

  result.errors.passwordsMatch;

  console.log(JSON.stringify(result.errors, null, 2));
}

main();
