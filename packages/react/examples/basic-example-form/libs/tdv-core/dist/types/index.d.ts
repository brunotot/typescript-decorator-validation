import * as Decorators from "./src/decorators";
import { createClassDecorator, createClassValidator, createFieldDecorator, createFieldValidator } from "./src/decorators";
import { attribute } from "./src/decorators/data/structural/attribute";
import TdvCoreApi from "./src/index";
import * as Localization from "./src/localization";
import * as Reflection from "./src/reflection";
import * as Strategy from "./src/strategy";
import * as Utilities from "./src/utilities";
import * as Validation from "./src/validation";
import { Form } from "./src/validation/models/Form";
export import Class = Utilities.Types.Class;
export import UnwrapClass = Utilities.Types.UnwrapClass;
export import ValidationResult = Validation.ValidationResult;
export { Form, attribute, createClassDecorator, createClassValidator, createFieldDecorator, createFieldValidator, };
export { Decorators, Localization, Reflection, Strategy, Utilities, Validation };
/**
 * An overridable interface designed for disabling nested validation on custom object types.
 * - when specified ***(example 1)***: an object type is considered primitive and it's simplified errors render as `string[]`
 * - when not specified ***(example 2)***: an object type is considered as is and it's simplified errors are evaluated by {@link Strategy.Impl.Errors evaluate<T, string[]>})
 *
 * @example
 * 1: Disabling nested form validation for `Coordinate` class by augmenting the `PrimitiveSet` interface from `tdv-core`. This is a way of treating custom object types as primitives and avoiding recursive field validation
 * ```ts
 * // coordinate.ts - model class which is considered primitive
 * export class Coordinate {
 *   x: number;
 *   y: number;
 * }
 * ```
 *
 * <div style="height: 1rem"></div>
 *
 * ```ts
 * // index.ts - entry point of the app
 * declare module "tdv-core" {
 *   interface PrimitiveSet {
 *     // Specify object types as primitives here
 *     values: [Coordinate];
 *   }
 * }
 * ```
 *
 * <div style="height: 1rem"></div>
 *
 * ```ts
 * // consumer.ts - model class which holds Coordinate property
 * import { createFieldValidator } from "tdv-core";
 *
 * // custom Coordinate validator
 * function MinX(minX: number) {
 *   return createFieldValidator<Coordinate>(coordinate => ({
 *     key: "MinX",
 *     valid: coordinate.x >= minX,
 *     message: `Minimum X is ${minX}`
 *   }))
 * }
 *
 * // Coordinate class definition
 * class Consumer {
 *   \@MinX(10)
 *   coordinate: Coordinate; // primitive, doesn't validate recursively
 * }
 *
 * const engine = new ValidationEngine(Consumer);
 * const payload = { coordinate: { x: 9, y: 23 } };
 * const { errors } = engine.validate(payload);
 * const coordinateErrors = errors.coordinate;
 * console.log(coordinateErrors); // ["Minimum X is 10"]
 * ```
 *
 * @example
 * 2: Default behavior - nested field validation is enabled for `Coordinate` class. It uses `\@attribute` for supplying validation engine with the runtime schema representation of the decorated field (if \@attribute is not defined then a type mismatch occurs between runtime type and compiled type)
 * ```ts
 * // coordinate.ts
 * import { collection } from "tdv-core";
 *
 * export class Coordinate {
 *   \@collection.number.ValueMin(10, { message: "Minimum X is 10" })
 *   x: number;
 *   y: number;
 * }
 * ```
 *
 * <div style="height: 1rem"></div>
 *
 * ```ts
 * // consumer.ts - model class which holds Coordinate property
 * import { attribute } from "tdv-core";
 *import Localization from '../react/examples/basic-example-form/libs/tdv-core/dist/types/src/localization/index.d';
import Utilities from './dist/src/utilities/index';
import { Form } from './src/validation/models/Form';

 * class Consumer {
 *   \@attribute(Coordinate) // enables deep validation
 *   coordinate: Coordinate; // non-primitive
 * }
 *
 * const engine = new ValidationEngine(Consumer);
 * const payload = { coordinate: { x: 9, y: 23 } };
 * const { errors } = engine.validate(payload);
 * const coordinateErrors = errors.coordinate;
 * console.log(coordinateErrors); // { root: [], data: { x: ["Minimum X is 10"], y: [] } }
 * ```
 */
export interface PrimitiveSet {
}
export default TdvCoreApi;
//# sourceMappingURL=index.d.ts.map