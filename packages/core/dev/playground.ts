import EntityProcessor from "../src/model/processor/entity.processor";
import MetadataProcessor from "../src/model/processor/MetadataProcessor";
import Required from "../validators/any/Required";
import foreach from "../validators/array/foreach";

class TestClass {
  @foreach(Required())
  array: string[] = [];
}

const processor = new EntityProcessor(TestClass);
const res = processor.validate({
  array: ["", "2", "3"],
});
//console.log(res);

//console.log(res.valid);

const meta = MetadataProcessor.inferFrom(TestClass);
//console.log(meta.data);
console.log(processor.schema);
debugger;
