import { ValidationHandler } from "..";
import Required from "./decorators/validators/any/Required";
import Password from "./decorators/validators/string/Password";
import { ValidationGroupType } from "./handler/ValidationHandler";
import { Locale, setLocale } from "./model/messages/Locale";

setLocale(Locale.HR);

// TODO raspodjela primitive i nonprimitive
// TODO: Separate CollectionSize and StringSize
// TODO: update/create group

function log(object: any) {
  console.log(JSON.stringify(object, null, 2));
}

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

log(result);
