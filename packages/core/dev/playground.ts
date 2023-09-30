import { Localization, ValidationEngine, decorate } from "./../index";

const translations: Record<string, Record<string, string>> = {
  en: { required: `[en]: Text field must not be empty` },
  hr: { required: `[hr]: Tekstualno polje ne smije biti prazno` },
  es: { required: `[es]: El campo de texto no debe estar vacío.` },
};

Localization.MessageResolver.configure(
  (locale, message) => translations[locale][message]
);

class SomeClass {
  @decorate.string.Required("required")
  input: string = "";
}

const engine = new ValidationEngine(SomeClass, { locale: "es" });
const result = engine.validate({});
console.log(result.errors.input);
// [ '[es]: El campo de texto no debe estar vacío.' ]
