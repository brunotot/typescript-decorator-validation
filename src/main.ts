import { ValidationHandler } from "..";
import Required from "./decorators/validators/any/Required";
import Truthy from "./decorators/validators/any/Truthy";
import { valid } from "./decorators/validators/any/valid";
import Email from "./decorators/validators/string/Email";
import ExactLength from "./decorators/validators/string/ExactLength";
import MaxLength from "./decorators/validators/string/MaxLength";
import MinLength from "./decorators/validators/string/MinLength";
import Password from "./decorators/validators/string/Password";
import { TypeGroup } from "./model/type/namespace/TypeGroup.ns";

// TODO: runtime validation for array
// TODO LIBRARY ZA VIZUALIZACIJU CMD texta mozda?
//setLocale(Locale.HR);

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

  result.errors.passwordsMatch;

  console.log(JSON.stringify(result.errors, null, 2));
}

main();
