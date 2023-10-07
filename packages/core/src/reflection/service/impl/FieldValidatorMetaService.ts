import API from "api";

import { AbstractMetaService } from "../AbstractMetaService";

/**
 * A configurer class which allows for easier manipulation of decorated fields and corresponding metadata
 *
 * @remarks
 * This class is responsible for managing metadata related to validation.
 * It provides methods to add validators, get field names, and manage descriptors.
 */
export class FieldValidatorMetaService extends AbstractMetaService<
  Map<string, API.Reflection.Descriptor.Instance<any, any, any>>
> {
  /**
   * Static method to create a new instance of FieldValidatorMetaService.
   *
   * @param strategy - The strategy to inject.
   * @returns A new instance of FieldValidatorMetaService.
   */
  public static inject(
    strategy: API.Reflection.MetaStrategy
  ): FieldValidatorMetaService {
    return new FieldValidatorMetaService(strategy);
  }

  #fields!: string[];

  private constructor(strategy: API.Reflection.MetaStrategy) {
    super(FieldValidatorMetaService.name, strategy, () => new Map());
    API.Reflection.isClass(strategy)
      ? this.#handleClassInit(strategy)
      : this.#handleContextInit(strategy as any);
  }

  /**
   * Adds a validator to a field.
   *
   * @param field - The name of the field.
   * @param isValid - The validation function.
   * @param groups - Optional validation groups.
   */
  addValidator(
    field: string,
    isValid: API.Validation.Evaluator<any>,
    groups?: string | string[]
  ) {
    this.getUntypedDescriptor(field).rules.root.add({
      groups: API.Decorator.groups(groups),
      validate: isValid,
    });
  }

  /**
   * Gets the names of all fields present within given
   * reflection strategy (`Types.Class<T>` or `Decorator.Context`).
   *
   * @returns An array of field names.
   */
  getFields() {
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
  getTypedDescriptor<TClass, TName extends keyof TClass>(
    thisName: TName
  ): API.Reflection.Descriptor.Instance<unknown, TClass, TName> {
    return this.getUntypedDescriptor(
      thisName as string
    ) as API.Reflection.Descriptor.Instance<unknown, TClass, TName>;
  }

  /**
   * Gets an untyped descriptor for a given field key.
   *
   * @param fieldKey - The key of the field.
   * @returns The untyped descriptor.
   */
  getUntypedDescriptor(
    fieldKey: any
  ): API.Reflection.Descriptor.Instance<any, any, any> {
    if (!this.hasDescriptor(fieldKey)) {
      const cfg = { thisName: fieldKey };
      const fieldValue = new API.Reflection.Descriptor.Instance<
        unknown,
        unknown,
        any
      >(cfg);
      this.data.set(fieldKey, fieldValue);
    }
    const descriptor = this.data.get(fieldKey)!;
    descriptor.hostClass = this.class ? this.class : descriptor.hostClass;
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
  #handleClassInit(clazz: API.Utilities.Types.Class<any>) {
    this.#fields = API.Reflection.getClassFieldNames(clazz) as string[];
    this.#fields.forEach((name) => this.getUntypedDescriptor(name));
  }

  /**
   * Initializes the class fields when a decorator context is provided as a strategy.
   *
   * @param _context - The decorator context.
   * @remarks
   * This method sets the `#fields` array to an empty array as no class fields are available.
   */
  #handleContextInit(_context: API.Decorator.Context) {
    this.#fields = [];
  }
}
