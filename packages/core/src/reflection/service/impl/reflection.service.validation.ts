import Decorator from "../../../types/namespace/decorator.namespace";
import Objects from "../../../types/namespace/objects.namespace";
import Validation from "../../../types/namespace/validation.namespace";
import Class from "../../../types/validation/class.type";
import ReflectionDescriptor from "../../models/reflection.descriptor";
import MetaService, {
  MetaStrategy,
  getClassFieldNames,
  isClass,
} from "../reflection.service";

export default class ValidationMetaService extends MetaService<
  Map<string, ReflectionDescriptor<any, any, any>>
> {
  public static inject(strategy: MetaStrategy): ValidationMetaService {
    return new ValidationMetaService(strategy);
  }

  #fields!: string[];

  private constructor(strategy: MetaStrategy) {
    super(ValidationMetaService.name, strategy, () => new Map());
    isClass(strategy)
      ? this.#handleClassInit(strategy)
      : this.#handleContextInit(strategy);
  }

  addValidator(
    field: string,
    isValid: Validation.Evaluator<any>,
    groups?: Validation.GroupsParam
  ) {
    this.getUntypedDescriptor(field).rules.root.add({
      groups: this.#sanitizeGroups(groups),
      validate: isValid,
    });
  }

  getFields() {
    return this.#fields;
  }

  hasDescriptor(descriptorName: string) {
    return this.data.has(descriptorName);
  }

  getTypedDescriptor<TClass, TName extends keyof TClass>(
    thisName: TName
  ): ReflectionDescriptor<unknown, TClass, TName> {
    return this.getUntypedDescriptor(
      thisName as string
    ) as ReflectionDescriptor<unknown, TClass, TName>;
  }

  getUntypedDescriptor(fieldKey: any): ReflectionDescriptor<any, any, any> {
    if (!this.hasDescriptor(fieldKey)) {
      const cfg = { thisName: fieldKey };
      const fieldValue = new ReflectionDescriptor<unknown, unknown, any>(cfg);
      this.data.set(fieldKey, fieldValue);
    }
    const descriptor = this.data.get(fieldKey)!;
    descriptor.hostClass = this.class ? this.class : descriptor.hostClass;
    return descriptor;
  }

  #handleClassInit(clazz: Class<any>) {
    this.#fields = getClassFieldNames(clazz) as string[];
    this.#fields.forEach((name) => this.getUntypedDescriptor(name));
  }

  #handleContextInit(_context: Decorator.Context) {
    this.#fields = [];
  }

  #sanitizeGroups(param?: Validation.GroupsParam): Validation.Groups {
    return Array.isArray(param)
      ? Objects.unique(param)
      : param !== undefined
      ? [param]
      : [];
  }
}
