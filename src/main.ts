import { ValidationHandler } from "..";
import Required from "./decorators/validators/any/Required";
import Password from "./decorators/validators/string/Password";
import { ValidationGroupType } from "./handler/ValidationHandler";
import { Locale, setLocale } from "./model/messages/Locale";

setLocale(Locale.HR);

class ParentForm {
  @Required()
  @Password()
  str1?: string;

  @Required()
  str2?: string;

  @Required()
  someDate?: Date;
}

const groups: ValidationGroupType[] = [];
const clazz = ParentForm;

const handler = new ValidationHandler(clazz, ...groups);
const result1 = handler.validate({
  str1: "",
  str2: "",
  someDate: new Date(Date.parse("LOL")),
});
const result2 = handler.validate({
  str1: "",
  str2: "valid",
  someDate: new Date(),
});
console.log(result1);
