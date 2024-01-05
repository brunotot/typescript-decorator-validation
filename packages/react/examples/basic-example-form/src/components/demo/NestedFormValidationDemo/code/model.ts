import { Decorators } from "tdv-core";

export class AddressForm {
  @Decorators.Required()
  country: string = "";
  @Decorators.Required()
  city: string = "";
  street: string = "";
  @Decorators.Pattern(/^\d{5}$/, { message: "Postal code must be 5 digits" })
  postalCode: string = "";
}

export class UserForm {
  @Decorators.Required()
  firstName: string = "";
  @Decorators.Required()
  lastName: string = "";
  @Decorators.attribute(AddressForm)
  addressForm: AddressForm = new AddressForm();
}

// prettier-ignore
export const MODEL_CODE = 
``
