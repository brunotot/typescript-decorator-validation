"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEngine = void 0;
const react_1 = require("react");
const tdv_core_1 = require("tdv-core");
/**
 * React hook which creates a memoized {@link Form} instance for a given class and configuration.
 * @typeParam TClass - The type of the model class.
 * @param {Utilities.Types.Class<TClass>} Class - The model class to create the engine for.
 * @param {Validation.FormConfig<TClass>} config - Optional configuration for the engine.
 * @returns {Form<TClass>} - The created engine instance.
 */
function useEngine(Class, config) {
    return (0, react_1.useMemo)(() => {
        return new tdv_core_1.Form(Class, config);
    }, [JSON.stringify(config)]);
}
exports.useEngine = useEngine;
