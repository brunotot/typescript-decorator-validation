import Localization from "../src/localization";
import EntityProcessor from "../src/reflection/models/entity.processor";
import Required from "../validators/any/Required";

Localization.Resolver.configure((locale, msg) => translations[locale][msg]);

const translations: any = {
  hr: { translation1: `[hr]: Unos je obavezan` },
  en: { translation1: `[en]: Field is mandatory` },
  it: { translation1: `[it]: Field is mandatory` },
};

class TestClass {
  @Required("translation1")
  str: string = "";
}

//const meta = ValidationMetaService.inject(TestClass);
const processor = new EntityProcessor(TestClass, {
  locale: "it",
  groups: ["group1"],
});
console.log(processor.validate({}));
processor.locale = "hr";
console.log(processor.validate({}));
debugger;
