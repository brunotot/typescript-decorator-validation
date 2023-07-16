import {
  ValidationFn,
  ValidationGroupType,
} from "../../src/processor/EntityProcessor";
import {
  Decorator,
  buildDecorator,
} from "../../src/model/utility/decorator.utility";
import {
  ValidationGroupParamType,
  ValidatorBuilder,
} from "../../src/model/utility/type.utility";
import MetadataProcessor from "../../src/processor/MetadataProcessor";

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
