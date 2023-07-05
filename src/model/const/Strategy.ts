import { NullableType } from "../../service/ValidatorService";
import { buildFieldDecorator } from "../../service/DecoratorService";
import { PropertyTypeGroup } from "./PropertyMetadata";
import { Class } from "../type/Class.type";
import MetadataService from "../../service/MetadataService";

export type ConstructorCreatorType<T> = () => Class<T>;

function buildTypeGroupDecorator<T>(
  typeGroup: PropertyTypeGroup,
  constructorCreator: ConstructorCreatorType<any>
) {
  return buildFieldDecorator<T>((target, name) => {
    setConstructorCreator(target, name, constructorCreator);
    setTypeGroup(target, name, typeGroup);
  });
}

function setConstructorCreator(
  target: any,
  name: string,
  constructorCreator: ConstructorCreatorType<any>
) {
  if (!constructorCreator) return;
  new MetadataService(target.constructor)
    .get(name)
    .setConstructorCreator(constructorCreator);
}

function setTypeGroup(target: any, name: string, typeGroup: PropertyTypeGroup) {
  new MetadataService(target.constructor).get(name).setTypeGroup(typeGroup);
}

function primitive<T extends NullableType<string | number | boolean | Date>, C>(
  constructorCreator?: ConstructorCreatorType<C>
) {
  return buildTypeGroupDecorator<T>("PRIMITIVE", constructorCreator!);
}

function object<T extends NullableType<object>, C>(
  constructorCreator: ConstructorCreatorType<C>
) {
  return buildTypeGroupDecorator<T>("OBJECT", constructorCreator);
}

function primitiveArray<
  T extends NullableType<(string | number | boolean | Date)[]>,
  C
>(constructorCreator?: () => Class<C>) {
  return buildTypeGroupDecorator<T>("PRIMITIVE_ARRAY", constructorCreator!);
}

function objectArray<T extends NullableType<object[]>, C>(
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
