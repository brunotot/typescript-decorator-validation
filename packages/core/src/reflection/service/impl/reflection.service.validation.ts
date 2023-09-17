import ReflectionDescriptor from "../../models/reflection.descriptor";
import MetaService, {
  MetaStrategy,
  getClassFieldNames,
  isClass,
} from "../reflection.service";

type ValidationMetaEntry = Map<string, ReflectionDescriptor<any, any, any>>;

export default class ValidationMetaService extends MetaService<ValidationMetaEntry> {
  public static inject(strategy: MetaStrategy): ValidationMetaService {
    return new ValidationMetaService(strategy);
  }

  private constructor(strategy: MetaStrategy) {
    super(ValidationMetaService.name, strategy, () => new Map());
    if (isClass(strategy)) {
      getClassFieldNames(strategy).forEach((name) =>
        this.descriptor<any, any>(name)
      );
    }
  }

  descriptor<TClass, TName extends keyof TClass>(
    thisName: TName
  ): ReflectionDescriptor<unknown, TClass, TName> {
    const key = thisName as string;
    if (!this.data.has(key)) {
      this.data.set(
        key,
        new ReflectionDescriptor<unknown, TClass, TName>({
          thisName,
        })
      );
    }
    const value = this.data.get(key)!;
    if (this.class) {
      value.hostClass = this.class!;
    }
    return value;
  }
}
