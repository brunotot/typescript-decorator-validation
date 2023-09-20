import Class from "../../types/validation/class.type";
import ValidationMetaService from "../service/impl/reflection.service.validation";
import { getClassFieldDescriptor } from "../service/reflection.service";
import ReflectionRule from "./reflection.rule";
import {
  ReflectionStrategy,
  ReflectionStrategyImpl,
  ReflectionStrategyType,
} from "./reflection.strategy";

export type FieldDescriptorRules<FieldType> = {
  root: ReflectionRule<FieldType>;
  foreach: ReflectionRule<FieldType>;
};

export type ReflectionDescriptorName<HostClass> = keyof HostClass | undefined;

export type DescriptorProps<
  This,
  HostClass,
  Name extends ReflectionDescriptorName<HostClass> = undefined
> = {
  hostClass?: Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: Class<This>;
  thisName?: Name;
  thisDefault?: ReflectionDescriptorThis<HostClass, Name>;
  rules?: FieldDescriptorRules<ReflectionDescriptorThis<HostClass, Name>>;
};

export type ReflectionDescriptorThis<
  HostClass,
  Name extends ReflectionDescriptorName<HostClass> = undefined
> = Name extends keyof HostClass ? HostClass[Name] : HostClass;

export default class ReflectionDescriptor<
  This,
  HostClass,
  Name extends keyof HostClass | undefined = undefined
> {
  hostClass?: Class<HostClass>;
  hostDefault?: HostClass;
  thisClass?: Class<This>;
  thisName?: Name;
  thisDefault?: ReflectionDescriptorThis<HostClass, Name>;
  rules: FieldDescriptorRules<ReflectionDescriptorThis<HostClass, Name>>;

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
    this.hostDefault = hostDefault ?? hostClass ? new hostClass!() : undefined;
    this.thisDefault = thisDefault;
    this.rules = rules ?? {
      root: new ReflectionRule(),
      foreach: new ReflectionRule(),
    };
  }

  public get StrategyImpl() {
    const strategy = this.strategy;
    if (!(strategy in ReflectionStrategyImpl)) {
      const error = `Validation strategy not implemented for field type '${strategy}'`;
      throw new Error(error);
    }
    return ReflectionStrategyImpl[strategy];
  }

  public get strategy(): ReflectionStrategyType {
    if (!this.hostClass) {
      return ReflectionStrategy.unknown;
    }
    if (!this.thisName) {
      return ReflectionStrategy.composite;
    }
    const instance = new this.hostClass!();
    const fieldName = this.thisName!;

    const getNativeStrategy = (value: unknown) => {
      const meta = ValidationMetaService.inject(this.hostClass!);
      const descriptor = meta.getTypedDescriptor<HostClass, keyof HostClass>(
        this.thisName!
      );

      return Array.isArray(value)
        ? descriptor.thisClass
          ? ReflectionStrategy.compositeArray
          : ReflectionStrategy.primitiveArray
        : descriptor.thisClass
        ? ReflectionStrategy.composite
        : ReflectionStrategy.primitive;
    };

    const descriptor = getClassFieldDescriptor(this.hostClass!, fieldName);
    const isGetter = descriptor && descriptor.get && !descriptor.set;

    if (isGetter) {
      const value = descriptor.get!.call(instance);
      return typeof value === "function"
        ? `() => ${getNativeStrategy(value())}`
        : `get (): ${getNativeStrategy(value)}`;
    }

    const value = instance[fieldName];

    // Check if the field is a function
    if (typeof value === "function") {
      return `() => ${getNativeStrategy(value())}`;
    }

    return getNativeStrategy(instance[fieldName]);
  }
}
