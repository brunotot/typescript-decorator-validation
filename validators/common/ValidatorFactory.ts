import {
  ValidationFn,
  ValidationGroupType,
} from "../../src/handler/ValidationHandler";
import {
  ValidationGroupParamType,
  ValidatorBuilder,
} from "../../src/model/utility/type.utility";
import MetadataProcessor from "../../src/processor/MetadataProcessor";
import { Decorator, buildDecorator } from "../../src/service/DecoratorService";

class ValidatorFactory {
  make<T>(builder: ValidatorBuilder<T>): Decorator<T> {
    return buildDecorator<T>((key, processor) => {
      saveMetadata(processor, key, builder.groups!, builder.isValid);
    });
  }
}

function getSanitizedGroups(unsanitizedGroups?: ValidationGroupParamType) {
  return Array.isArray(unsanitizedGroups)
    ? unsanitizedGroups
    : unsanitizedGroups !== undefined
    ? [unsanitizedGroups]
    : ([] as ValidationGroupType[]);
}

function saveMetadata(
  processor: MetadataProcessor,
  key: string,
  groups: ValidationGroupParamType,
  isValid: ValidationFn<any>
) {
  const validate = processor.getValidationProcessor(key);
  validate.appendNode({
    groups: getSanitizedGroups(groups),
    validate: isValid,
  });
}

export default new ValidatorFactory();
