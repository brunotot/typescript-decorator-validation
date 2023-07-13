import { Nullable } from "../../service/ValidatorService";
import { buildDecorator } from "../../service/DecoratorService";
import { PropertyTypeGroup } from "./PropertyMetadata";
import { Class } from "../type/Class.type";
import MetadataProcessor from "../../processor/MetadataProcessor";

export type ConstructorCreatorType<T> = () => Class<T>;

function buildTypeGroupDecorator<T>(
  typeGroup: PropertyTypeGroup,
  constructorCreator: ConstructorCreatorType<any>
) {
  return buildDecorator<T>((name, processor) => {
    setConstructorCreator(name, constructorCreator, processor);
    setTypeGroup(name, typeGroup, processor);
  });
}

function setConstructorCreator(
  name: string,
  constructorCreator: ConstructorCreatorType<any>,
  processor: MetadataProcessor
) {
  if (!constructorCreator) return;
  processor.getValidationProcessor(name).constructorCreator =
    constructorCreator;
}

function setTypeGroup(
  name: string,
  typeGroup: PropertyTypeGroup,
  processor: MetadataProcessor
) {
  processor.getValidationProcessor(name).typeGroup = typeGroup;
}

function primitive<T extends Nullable<string | number | boolean | Date>, C>(
  constructorCreator?: ConstructorCreatorType<C>
) {
  return buildTypeGroupDecorator<T>("PRIMITIVE", constructorCreator!);
}

function object<T extends Nullable<object>, C>(
  constructorCreator: ConstructorCreatorType<C>
) {
  return buildTypeGroupDecorator<T>("OBJECT", constructorCreator);
}

function primitiveArray<
  T extends Nullable<(string | number | boolean | Date)[]>,
  C
>(constructorCreator?: () => Class<C>) {
  return buildTypeGroupDecorator<T>("PRIMITIVE_ARRAY", constructorCreator!);
}

function objectArray<T extends Nullable<object[]>, C>(
  constructorCreator: ConstructorCreatorType<C>
) {
  return buildTypeGroupDecorator<T>("OBJECT_ARRAY", constructorCreator);
}

const strategy = {
  primitive,
  object,
  primitiveArray,
  objectArray,
};

export default strategy;
