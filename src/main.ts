import { ValidationHandler } from "..";
import Valid from "./decorators/semantics/Valid";
import NotEmpty from "./decorators/validators/any/NotEmpty";
import { ValidationData } from "./handler/ValidationHandler";
import { Class } from "./model/type/class.type";
import "reflect-metadata";

function logType(target: any, key: string) {
  const type = Reflect.getMetadata("design:type", target, key);
  const name: string = type?.name;
  //console.log(`Field: ${key.padStart(10)} | Type: ${name}`);

  //console.log(type);
  //console.log(Object.getOwnPropertyDescriptors(type));
  //console.log(new type.constructor()?.username);
  //console.log(type.prototype);
  //console.log(new ValidationHandler(type.constructor).validate({}));
}

type ParentFormValidationDataType = ValidationData<ParentForm>;

class ChildForm {
  @NotEmpty()
  number!: number;
}

class ParentForm {
  @NotEmpty()
  username!: number;

  @NotEmpty()
  password!: string;

  @Valid(ChildForm)
  childForm!: ChildForm;

  @Valid(ChildForm)
  childFormArray!: ChildForm[];
}

const validator = new ValidationHandler(ParentForm);

const result = validator.validate({
  username: 0,
  password: "Test",
  childForm: {
    number: undefined as any,
  },
  childFormArray: [
    {
      number: 0,
    },
  ],
});

function log(object: any) {
  console.log(JSON.stringify(object, null, 2));
}

log(result);
