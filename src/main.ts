import { ValidationHandler } from "..";
import Required from "./decorators/validators/any/Required";
import Password from "./decorators/validators/string/Password";
import { ValidationGroupType } from "./handler/ValidationHandler";
import { Locale, setLocale } from "./model/messages/Locale";
setLocale(Locale.HR);

class ParentForm {
  @Required()
  @Password()
  str?: string;
}

const groups: ValidationGroupType[] = [];
const clazz = ParentForm;

const handler = new ValidationHandler(clazz, ...groups);
const result = handler.validate({
  str: "",
});

console.log(JSON.stringify(result, null, 2));
