import API from "../../../index";
/**
 * A namespace which holds relevant data regarding field descriptors acquired from reflection
 */
declare namespace ReflectionDescriptor {
    /**
     * Describes the reflection rules for a specific field within a class.
     *
     * @typeParam FieldType - The type of the field.
     */
    type FieldDescriptorRules<FieldType> = {
        root: API.Reflection.Rule.Instance<FieldType>;
        foreach: API.Reflection.Rule.Instance<FieldType>;
    };
    /**
     * Type alias for the name of a descriptor within a host class.
     *
     * @typeParam HostClass - The type of the host class.
     */
    type ReflectionDescriptorName<HostClass> = keyof HostClass | undefined;
    /**
     * Properties for constructing a `ReflectionDescriptor`.
     *
     * @typeParam This - The type of the current class.
     * @typeParam HostClass - The type of the host class.
     * @typeParam Name - The name of the descriptor within the host class.
     */
    type DescriptorProps<This, HostClass, Name extends ReflectionDescriptorName<HostClass> = undefined> = {
        hostClass?: API.Utilities.Types.Class<HostClass>;
        hostDefault?: HostClass;
        thisClass?: API.Utilities.Types.Class<This>;
        thisName?: Name;
        thisDefault?: ReflectionDescriptorThis<HostClass, Name>;
        rules?: FieldDescriptorRules<ReflectionDescriptorThis<HostClass, Name>>;
    };
    /**
     * Properties for constructing a `ReflectionDescriptor`.
     *
     * @typeParam This - The type of the current class.
     * @typeParam HostClass - The type of the host class.
     * @typeParam Name - The name of the descriptor within the host class.
     */
    type ReflectionDescriptorThis<HostClass, Name extends ReflectionDescriptorName<HostClass> = undefined> = Name extends keyof HostClass ? HostClass[Name] : HostClass;
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
    class Instance<This, HostClass, Name extends keyof HostClass | undefined = undefined> {
        hostClass?: API.Utilities.Types.Class<HostClass>;
        hostDefault?: HostClass;
        thisClass?: API.Utilities.Types.Class<This>;
        thisName?: Name;
        thisDefault?: ReflectionDescriptorThis<HostClass, Name>;
        rules: FieldDescriptorRules<ReflectionDescriptorThis<HostClass, Name>>;
        /**
         * Constructs a new `ReflectionDescriptor` instance.
         */
        constructor({ hostClass, hostDefault, thisDefault, thisName, thisClass, rules, }: DescriptorProps<This, HostClass, Name>);
        /**
         * Gets the implementation of the reflection strategy.
         *
         * @throws {Error} If the strategy is not implemented.
         */
        get StrategyImpl(): API.Utilities.Types.Class<API.Strategy.Service.AbstractStrategy>;
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
        get strategy(): API.Reflection.Strategy.Key;
    }
}
export default ReflectionDescriptor;
//# sourceMappingURL=ReflectionDescriptor.d.ts.map