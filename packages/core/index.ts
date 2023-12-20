import collection from "./collection";
import { create } from "./collection/any/create";
import { attribute } from "./collection/class/attribute";
import * as Decorator from "./src/decorators";
import TdvCoreApi from "./src/index";
import * as Localization from "./src/localization";
import Reflection from "./src/reflection";
import Strategy from "./src/strategy";
import Utilities from "./src/utilities";
import Validation from "./src/validation";

export default TdvCoreApi;

export {
  Decorator,
  Localization,
  Reflection,
  Strategy,
  Utilities,
  Validation,
  attribute,
  collection,
  create,
};

/**
 * An overridable interface designed for disabling nested validation on custom object types.
 * - when specified ***(example 1)***: an object type is considered primitive and it's simplified errors render as `string[]`
 * - when not specified ***(example 2)***: an object type is considered as is and it's simplified errors are evaluated by {@link Strategy.Factory.Impl.Errors evaluate<T, string[]>})
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
 * import { create } from "tdv-core";
 *
 * // custom Coordinate validator
 * function MinX(minX: number) {
 *   return create<Coordinate>(coordinate => ({
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
export interface PrimitiveSet {}
