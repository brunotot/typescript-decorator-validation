import EntityProcessor from "../src/model/processor/EntityProcessor";
import validators from "../validators/index";

class TestClass {
  @validators.string.Required()
  username!: string;
}

const processor = new EntityProcessor(TestClass);
console.log(processor.validate({}));
