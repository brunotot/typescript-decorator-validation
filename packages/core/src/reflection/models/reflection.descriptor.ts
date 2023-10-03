import Types from "../../types/namespace/types.namespace";
import Reflection from "../index";
import ValidationConfigurer from "../service/impl/FieldValidatorMetaService";

/**
 * A namespace which holds relevant data regarding field descriptors acquired from reflection
 */
namespace ReflectionDescriptor {
  /**
   * Describes the reflection rules for a specific field within a class.
   *
   * @typeParam FieldType - The type of the field.
   */
  export type FieldDescriptorRules<FieldType> = {
    root: Reflection.Rule<FieldType>;
    foreach: Reflection.Rule<FieldType>;
  };

  /**
   * Type alias for the name of a descriptor within a host class.
   *
   * @typeParam HostClass - The type of the host class.
   */
  export type ReflectionDescriptorName<HostClass> = keyof HostClass | undefined;

  /**
   * Properties for constructing a `ReflectionDescriptor`.
   *
   * @typeParam This - The type of the current class.
   * @typeParam HostClass - The type of the host class.
   * @typeParam Name - The name of the descriptor within the host class.
   */
  export type DescriptorProps<
    This,
    HostClass,
    Name extends ReflectionDescriptorName<HostClass> = undefined
  > = {
    hostClass?: Types.Class<HostClass>;
    hostDefault?: HostClass;
    thisClass?: Types.Class<This>;
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
  export type ReflectionDescriptorThis<
    HostClass,
    Name extends ReflectionDescriptorName<HostClass> = undefined
  > = Name extends keyof HostClass ? HostClass[Name] : HostClass;

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
  export class ReflectionDescriptor<
    This,
    HostClass,
    Name extends keyof HostClass | undefined = undefined
  > {
    hostClass?: Types.Class<HostClass>;
    hostDefault?: HostClass;
    thisClass?: Types.Class<This>;
    thisName?: Name;
    thisDefault?: ReflectionDescriptorThis<HostClass, Name>;
    rules: FieldDescriptorRules<ReflectionDescriptorThis<HostClass, Name>>;

    /**
     * Constructs a new `ReflectionDescriptor` instance.
     *
     * @param props - The properties for constructing the descriptor.
     */
    constructor({
      hostClass,
      hostDefault,
      thisDefault,
      thisName,
      thisClass,
      rules,
    }: DescriptorProps<This, HostClass, Name>) {
      this.hostClass = hostClass;
      this.thisName = thisName;
      this.thisClass = thisClass;
      this.hostDefault =
        hostDefault ?? hostClass ? new hostClass!() : undefined;
      this.thisDefault = thisDefault;
      this.rules = rules ?? {
        root: new Reflection.Rule(),
        foreach: new Reflection.Rule(),
      };
    }

    /**
     * Gets the implementation of the reflection strategy.
     *
     * @throws {Error} If the strategy is not implemented.
     */
    public get StrategyImpl() {
      const strategy = this.strategy;
      if (!(strategy in Reflection.Strategy.ReflectionStrategyImpl)) {
        const error = `Validation strategy not implemented for field type '${strategy}'`;
        throw new Error(error);
      }
      return Reflection.Strategy.ReflectionStrategyImpl[strategy];
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
    public get strategy(): Reflection.Strategy.ReflectionStrategyType {
      if (!this.hostClass) {
        return Reflection.Strategy.ReflectionStrategy.unknown;
      }
      if (!this.thisName) {
        return Reflection.Strategy.ReflectionStrategy.composite;
      }
      const instance = new this.hostClass!();
      const fieldName = this.thisName!;

      const getNativeStrategy = (value: any) => {
        const meta = ValidationConfigurer.inject(this.hostClass!);
        const descriptor = meta.getTypedDescriptor<HostClass, keyof HostClass>(
          this.thisName!
        );

        if (
          value instanceof Promise ||
          (value && "key" in value && "valid" in value && "message" in value)
        ) {
          return Reflection.Strategy.ReflectionStrategy.function;
        }

        return Array.isArray(value)
          ? descriptor.thisClass
            ? Reflection.Strategy.ReflectionStrategy.compositeArray
            : Reflection.Strategy.ReflectionStrategy.primitiveArray
          : descriptor.thisClass
          ? Reflection.Strategy.ReflectionStrategy.composite
          : Reflection.Strategy.ReflectionStrategy.primitive;
      };

      const descriptor = Reflection.getClassFieldDescriptor(
        this.hostClass!,
        fieldName
      );
      const isGetter = descriptor && descriptor.get && !descriptor.set;

      if (isGetter) {
        const value = descriptor.get!.call(instance);
        return `get (): ${getNativeStrategy(value)}` as any;
      }

      const value = instance[fieldName];

      // Check if the field is a function
      if (typeof value === "function") {
        return getNativeStrategy(value());
      }

      return getNativeStrategy(value);
    }
  }
}

export default ReflectionDescriptor;
