import { Localization, ValidationEngine, decorate } from "./../index";

const translations: Record<string, Record<string, string>> = {
  hr: { translation1: `[hr]: Unos je obavezan` },
  en: { translation1: `[en]: Field is mandatory` },
  it: { translation1: `[it]: Field is mandatory` },
};

Localization.MessageResolver.configure((l, m) => translations[l][m]);

class TestClass {
  @decorate.string.Required("translation1")
  str: string = "";
}

//const meta = ValidationMetaService.inject(TestClass);
const processor = new ValidationEngine(TestClass, {
  locale: "it",
});
console.log(processor.validate({}));
processor.locale = "hr";
console.log(processor.validate({}));
debugger;
