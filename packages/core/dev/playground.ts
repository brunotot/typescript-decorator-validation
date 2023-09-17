import EntityProcessor from "../src/reflection/models/entity.processor";
import ValidationMetaService from "../src/reflection/service/impl/reflection.service.validation";
import Required from "../validators/any/Required";
import foreach from "../validators/array/foreach";

class TestClass {
  @foreach(Required())
  array: string[] = [];
}

const processor = new EntityProcessor(TestClass);
const res = processor.validate({});
//console.log(res);

//console.log(res.valid);

const meta = ValidationMetaService.inject(TestClass);
console.log(meta);
//console.log();
debugger;
