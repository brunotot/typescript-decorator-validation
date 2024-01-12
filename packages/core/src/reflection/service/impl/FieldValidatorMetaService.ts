import { AbstractMetaService, MetaStrategy } from "@reflection/service/AbstractMetaService";
import { type AbstractValidationStrategyService } from "@strategy";
import { StrategyData } from "@strategy/models/StrategyMapper";
import * as Strategies from "@strategy/service/impl";
import { Classes, EventEmitter, Types } from "@utilities";
import { ValidationMetadata } from "@validation/models/ValidationMetadata";
import type { ValidationEvaluator } from "@validation/types";

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
export type ControlDescriptorProps<This, HostClass, Name extends keyof HostClass | undefined = undefined> = {
  hostClass?: Types.Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: Types.Class<This>;
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
export class ControlDescriptor<This, HostClass, Name extends keyof HostClass | undefined = undefined> {
  hostClass?: Types.Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: Types.Class<This>;
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
  public get StrategyImpl(): Types.Class<AbstractValidationStrategyService> {
    const strategy = this.strategy;
    if (!(strategy in StrategyData)) {
      const error = `Validation strategy not implemented for field type '${strategy}'`;
      throw new Error(error);
    }
    return StrategyData[strategy];
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
  public get strategy(): string {
    if (!this.hostClass) {
      return "unknown";
    }
    if (!this.thisName) {
      return Strategies["ObjectStrategy"].Name;
    }
    const instance = new this.hostClass();
    const fieldName = this.thisName;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getNativeStrategy = (value: any) => {
      const meta = FieldValidatorMetaService.inject(this.hostClass!, this.eventEmitter);
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
        return Strategies["FunctionStrategy"].Name;
      }

      return Array.isArray(value)
        ? descriptor.thisClass
          ? Strategies["ObjectArrayStrategy"].Name
          : Strategies["PrimitiveArrayStrategy"].Name
        : descriptor.thisClass
        ? Strategies["ObjectStrategy"].Name
        : Strategies["PrimitiveStrategy"].Name;
    };

    const descriptor = Classes.getClassFieldDescriptor(this.hostClass, fieldName);
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

type FieldDecoratorCtx<T = unknown> = Readonly<{
  kind: "getter" | "method" | "field";
  static: boolean;
  private: boolean;
  name: string;
  metadata?: globalThis.DecoratorMetadataObject;
  access: {
    get: (object: any) => T;
  };
}>;

/**
 * A configurer class which allows for easier manipulation of decorated fields and corresponding metadata
 * @remarks This class is responsible for managing metadata related to validation. It provides methods to add validators, get field names, and manage descriptors.
 */
export class FieldValidatorMetaService extends AbstractMetaService<Map<string, ControlDescriptor<any, any, any>>> {
  /**
   * Static method to create a new instance of FieldValidatorMetaService.
   * @param strategy - The strategy to inject.
   * @returns A new instance of FieldValidatorMetaService.
   */
  public static inject(strategy: MetaStrategy, eventEmitter: EventEmitter): FieldValidatorMetaService {
    return new FieldValidatorMetaService(strategy, eventEmitter);
  }

  eventEmitter!: EventEmitter;
  #fields!: string[];

  private constructor(strategy: MetaStrategy, eventEmitter: EventEmitter) {
    super(FieldValidatorMetaService.name, strategy, () => new Map());
    this.eventEmitter = eventEmitter;
    Classes.isClass(strategy) ? this.#handleClassInit(strategy) : this.#handleContextInit(strategy as any);
  }

  /**
   * Adds a validator to a field.
   *
   * @param field - The name of the field.
   * @param isValid - The validation function.
   * @param groups - Optional validation groups.
   */
  addValidator(field: string, isValid: ValidationEvaluator<any>, groups: string[]): void {
    this.getUntypedDescriptor(field).validations.root.add({
      validate: isValid,
      groups,
    });
  }

  /**
   * Gets the names of all fields present within given
   * reflection strategy (`Types.Class<T>` or `Decorator.Context`).
   *
   * @returns An array of field names.
   */
  getFields(): string[] {
    return this.#fields;
  }

  /**
   * Checks if a descriptor exists for a given name.
   *
   * @param name - The name of a field descriptor.
   * @returns `true` if the descriptor exists, `false` otherwise.
   */
  hasDescriptor(name: string): boolean {
    return this.data.has(name);
  }

  /**
   * Gets a typed descriptor for a given field name.
   *
   * @param thisName - The name of the field.
   * @returns The typed descriptor.
   */
  getTypedDescriptor<TClass, TName extends keyof TClass>(thisName: TName): ControlDescriptor<unknown, TClass, TName> {
    return this.getUntypedDescriptor(thisName as string) as ControlDescriptor<unknown, TClass, TName>;
  }

  /**
   * Gets an untyped descriptor for a given field key.
   *
   * @param fieldKey - The key of the field.
   * @returns The untyped descriptor.
   */
  getUntypedDescriptor(fieldKey: any, eventEmitter?: EventEmitter): ControlDescriptor<any, any, any> {
    this.eventEmitter = eventEmitter ?? this.eventEmitter;
    if (!this.hasDescriptor(fieldKey)) {
      const cfg = { thisName: fieldKey, eventEmitter: this.eventEmitter };
      const fieldValue = new ControlDescriptor(cfg);
      this.data.set(fieldKey, fieldValue);
    }
    const descriptor = this.data.get(fieldKey);
    if (!descriptor) throw new Error(`Descriptor "${fieldKey}" does not exist`);
    descriptor.hostClass = this.class ? this.class : descriptor.hostClass;
    descriptor.eventEmitter = this.eventEmitter;
    return descriptor;
  }

  /**
   * Initializes the class fields and descriptors when a class is provided as a strategy.
   *
   * @param clazz - The class to initialize.
   * @remarks
   * This method populates the `#fields` array with the names of the class fields.
   * It also ensures that untyped descriptors are created for each field.
   */
  #handleClassInit(clazz: Types.Class<any>): void {
    this.#fields = Classes.getClassFieldNames(clazz) as string[];
    this.#fields.forEach(name => this.getUntypedDescriptor(name));
  }

  /**
   * Initializes the class fields when a decorator context is provided as a strategy.
   *
   * @param _context - The decorator context.
   * @remarks
   * This method sets the `#fields` array to an empty array as no class fields are available.
   */
  #handleContextInit(_context: FieldDecoratorCtx<any>): void {
    this.#fields = [];
  }
}
