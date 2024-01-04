import { Pattern, Required, attribute } from "tdv-core/validators";

export class AddressForm {
  @Required()
  country: string = "";
  @Required()
  city: string = "";
  street: string = "";
  @Pattern(/^\d{5}$/, { message: "Postal code must be 5 digits" })
  postalCode: string = "";
}

export class UserForm {
  @Required()
  firstName: string = "";
  @Required()
  lastName: string = "";
  @attribute(AddressForm)
  addressForm: AddressForm = new AddressForm();
}

// prettier-ignore
export const MODEL_CODE = 
``
