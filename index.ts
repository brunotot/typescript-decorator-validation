import InferredType from "./src/model/enum/InferredType";
import Rule from "./src/decorators/validators/custom/Rule";
import { validators } from "./src/model/const/Validators";
import ValidatorService from "./src/service/ValidatorService";
import { ValidationResult } from "./src/model/type/validation-result.type";
import { ErrorData } from "./src/model/type/error-data.type";
import { Class } from "./src/model/type/class.type";
import { ValidationClass } from "./src/model/type/validation-class.type";
import ValidationHandler, {
  ValidationFn,
} from "./src/handler/ValidationHandler";

export type {
  Class,
  ValidationResult,
  ValidationFn,
  ErrorData,
  ValidationClass,
};

export { InferredType, ValidatorService, validators, Rule, ValidationHandler };
