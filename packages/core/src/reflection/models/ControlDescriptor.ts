import API from "../../../index";
import { type EventEmitter } from "../../utilities/misc/EventEmitter";
import * as StrategyMapper from "./../../strategy/models/StrategyMapper";
import { ValidationMetadata } from "./ValidationMetadata";

/**
 * Describes the reflection rules for a specific field within a class.
 * @typeParam FieldType - The type of the field.
 */
export type ControlDescriptorValidationMetadata<FieldType> = {
  root: ValidationMetadata<FieldType>;
  foreach: ValidationMetadata<FieldType>;
};

/**
 * Properties for constructing a `ReflectionDescriptor`.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 */
export type ControlDescriptorType<
  HostClass,
  Name extends keyof HostClass | undefined = undefined
> = Name extends keyof HostClass ? HostClass[Name] : HostClass;

/**
 * Properties for constructing a `ReflectionDescriptor`.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 */
export type ControlDescriptorProps<
  This,
  HostClass,
  Name extends keyof HostClass | undefined = undefined
> = {
  hostClass?: API.Utilities.Types.Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: API.Utilities.Types.Class<This>;
  thisName?: Name;
  thisDefault?: ControlDescriptorType<HostClass, Name>;
  validations?: ControlDescriptorValidationMetadata<ControlDescriptorType<HostClass, Name>>;
  eventEmitter: EventEmitter;
};

/**
 * A class responsible for describing reflection metadata for a specific field within a class.
 * @typeParam This - The type of the current class.
 * @typeParam HostClass - The type of the host class.
 * @typeParam Name - The name of the descriptor within the host class.
 * @remarks This class is used to store metadata about a specific field, including its validation rules and default values.
 */
export class ControlDescriptor<
  This,
  HostClass,
  Name extends keyof HostClass | undefined = undefined
> {
  hostClass?: API.Utilities.Types.Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: API.Utilities.Types.Class<This>;
  thisName?: Name;
  thisDefault?: ControlDescriptorType<HostClass, Name>;
  validations: ControlDescriptorValidationMetadata<ControlDescriptorType<HostClass, Name>>;
  eventEmitter: EventEmitter;

  constructor(props: ControlDescriptorProps<This, HostClass, Name>) {
    this.hostClass = props.hostClass;
    this.thisName = props.thisName;
    this.thisClass = props.thisClass;
    this.hostDefault = props.hostDefault ?? props.hostClass ? new props.hostClass!() : undefined;
    this.thisDefault = props.thisDefault;
    this.eventEmitter = props.eventEmitter;
    this.validations = props.validations ?? {
      root: new ValidationMetadata(),
      foreach: new ValidationMetadata(),
    };
  }

  /**
   * Gets the implementation of the reflection strategy.
   * @throws {Error} If the strategy is not implemented.
   */
  public get StrategyImpl(): API.Utilities.Types.Class<API.Strategy.AbstractValidationStrategyService> {
    const strategy = this.strategy;
    if (!(strategy in StrategyMapper.data)) {
      const error = `Validation strategy not implemented for field type '${strategy}'`;
      throw new Error(error);
    }
    return StrategyMapper.data[strategy];
  }

  /**
   * Determines the reflection strategy type for the descriptor.
   * @returns The type of the reflection strategy.
   * @remarks
   * This method performs the following steps:
   * 1. Checks if the host class is defined.
   * 2. Checks if the field name is defined.
   * 3. Determines the strategy based on the field type and its metadata.
   */
  public get strategy(): StrategyMapper.Key {
    if (!this.hostClass) {
      return "unknown";
    }
    if (!this.thisName) {
      return API.Strategy.Object.Name;
    }
    const instance = new this.hostClass();
    const fieldName = this.thisName;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getNativeStrategy = (value: any) => {
      const meta = API.Reflection.FieldValidatorMetaService.inject(
        this.hostClass!,
        this.eventEmitter
      );
      const descriptor = meta.getTypedDescriptor<HostClass, keyof HostClass>(this.thisName!);

      if (
        value instanceof Promise ||
        (value &&
          typeof value === "object" &&
          "key" in value &&
          typeof value.key === "string" &&
          "valid" in value &&
          typeof value.valid === "boolean" &&
          "message" in value &&
          typeof value.message === "string")
      ) {
        return API.Strategy.Function.Name;
      }

      return Array.isArray(value)
        ? descriptor.thisClass
          ? API.Strategy.ObjectArray.Name
          : API.Strategy.PrimitiveArray.Name
        : descriptor.thisClass
        ? API.Strategy.Object.Name
        : API.Strategy.Primitive.Name;
    };

    const descriptor = API.Reflection.getClassFieldDescriptor(this.hostClass, fieldName);
    const isGetter = descriptor?.get && !descriptor.set;

    if (isGetter) {
      const value = descriptor.get!.call(instance);
      return `get (): ${getNativeStrategy(value)}` as any;
    }

    const value = instance[fieldName];

    if (typeof value === "function") {
      return getNativeStrategy(value.bind(this.hostDefault ?? new this.hostClass())());
    }

    return getNativeStrategy(value);
  }
}
