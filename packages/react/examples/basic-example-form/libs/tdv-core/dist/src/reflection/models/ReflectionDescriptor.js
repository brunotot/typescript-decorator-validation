import API from "../../../index";
/**
 * A namespace which holds relevant data regarding field descriptors acquired from reflection
 */
var ReflectionDescriptor;
(function (ReflectionDescriptor) {
    /**
     * A class responsible for describing reflection metadata for a specific field within a class.
     *
     * @typeParam This - The type of the current class.
     * @typeParam HostClass - The type of the host class.
     * @typeParam Name - The name of the descriptor within the host class.
     *
     * @remarks
     * This class is used to store metadata about a specific field, including its validation rules and default values.
     */
    class Instance {
        /**
         * Constructs a new `ReflectionDescriptor` instance.
         */
        constructor({ hostClass, hostDefault, thisDefault, thisName, thisClass, rules, }) {
            this.hostClass = hostClass;
            this.thisName = thisName;
            this.thisClass = thisClass;
            this.hostDefault = (hostDefault !== null && hostDefault !== void 0 ? hostDefault : hostClass) ? new hostClass() : undefined;
            this.thisDefault = thisDefault;
            this.rules = rules !== null && rules !== void 0 ? rules : {
                root: new API.Reflection.Rule.Instance(),
                foreach: new API.Reflection.Rule.Instance(),
            };
        }
        /**
         * Gets the implementation of the reflection strategy.
         *
         * @throws {Error} If the strategy is not implemented.
         */
        get StrategyImpl() {
            const strategy = this.strategy;
            if (!(strategy in API.Reflection.Strategy.data)) {
                const error = `Validation strategy not implemented for field type '${strategy}'`;
                throw new Error(error);
            }
            return API.Reflection.Strategy.data[strategy];
        }
        /**
         * Determines the reflection strategy type for the descriptor.
         *
         * @returns The type of the reflection strategy.
         *
         * @remarks
         * This method performs the following steps:
         * 1. Checks if the host class is defined.
         * 2. Checks if the field name is defined.
         * 3. Determines the strategy based on the field type and its metadata.
         */
        get strategy() {
            var _a;
            if (!this.hostClass) {
                return "unknown";
            }
            if (!this.thisName) {
                return API.Strategy.Types.Object.Name;
            }
            const instance = new this.hostClass();
            const fieldName = this.thisName;
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const getNativeStrategy = (value) => {
                const meta = API.Reflection.Services.FieldValidatorMetaService.inject(this.hostClass);
                const descriptor = meta.getTypedDescriptor(this.thisName);
                if (value instanceof Promise ||
                    (value &&
                        "key" in value &&
                        typeof value.key === "string" &&
                        "valid" in value &&
                        typeof value.valid === "boolean" &&
                        "message" in value &&
                        typeof value.message === "string")) {
                    return API.Strategy.Types.Function.Name;
                }
                return Array.isArray(value)
                    ? descriptor.thisClass
                        ? API.Strategy.Types.ObjectArray.Name
                        : API.Strategy.Types.PrimitiveArray.Name
                    : descriptor.thisClass
                        ? API.Strategy.Types.Object.Name
                        : API.Strategy.Types.Primitive.Name;
            };
            const descriptor = API.Reflection.getClassFieldDescriptor(this.hostClass, fieldName);
            const isGetter = (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) && !descriptor.set;
            if (isGetter) {
                const value = descriptor.get.call(instance);
                return `get (): ${getNativeStrategy(value)}`;
            }
            const value = instance[fieldName];
            // Check if the field is a function
            if (typeof value === "function") {
                return getNativeStrategy(value.bind((_a = this.hostDefault) !== null && _a !== void 0 ? _a : new this.hostClass())());
            }
            return getNativeStrategy(value);
        }
    }
    ReflectionDescriptor.Instance = Instance;
})(ReflectionDescriptor || (ReflectionDescriptor = {}));
export default ReflectionDescriptor;
