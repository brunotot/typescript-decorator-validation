import * as Decorators from "@decorators";
import * as Localization from "@localization";
import * as Reflection from "@reflection";
import * as Strategy from "@strategy";
import * as Utilities from "@utilities";
import * as Validation from "@validation";

/* Root exports */
export import PrimitiveType = Utilities.Types.PrimitiveType;
export import attribute = Decorators.attribute;
export import createClassDecorator = Decorators.createClassDecorator;
export import createClassValidator = Decorators.createClassValidator;
export import createFieldDecorator = Decorators.createFieldDecorator;
export import createFieldValidator = Decorators.createFieldValidator;
export import Form = Validation.Form;
export import Class = Utilities.Types.Class;
export import UnwrapClass = Utilities.Types.UnwrapClass;
export import ValidationResult = Validation.ValidationResult;
export * from "@overrides";

/* Namespace exports */
export { Decorators, Localization, Reflection, Strategy, Utilities, Validation };
