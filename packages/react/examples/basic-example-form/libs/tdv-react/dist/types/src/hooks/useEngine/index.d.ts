import { Form, type Utilities, type Validation } from "tdv-core";
/**
 * React hook which creates a memoized {@link Form} instance for a given class and configuration.
 * @typeParam TClass - The type of the model class.
 * @param {Utilities.Types.Class<TClass>} Class - The model class to create the engine for.
 * @param {Validation.FormConfig<TClass>} config - Optional configuration for the engine.
 * @returns {Form<TClass>} - The created engine instance.
 */
export declare function useEngine<TClass>(Class: Utilities.Types.Class<TClass>, config?: Validation.FormConfig<TClass>): Form<TClass>;
//# sourceMappingURL=index.d.ts.map