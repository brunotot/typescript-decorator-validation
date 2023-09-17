import Validation from "../../types/namespace/validation.namespace";
import Payload from "../../types/validation/payload.type";

function validationGroupPredicate<TFieldType>(groups: Validation.Group[]) {
  return (meta: Validation.Metadata<TFieldType>) =>
    groups.length
      ? meta.groups.some((o) => groups.includes(o))
      : !meta.groups.length;
}

export default class ReflectionRule<TFieldType> {
  #contents: Validation.Metadata<TFieldType>[];

  get contents() {
    return this.#contents;
  }

  constructor() {
    this.#contents = [];
  }

  validate<TBody>(
    value: TFieldType,
    payload: Payload<TBody>,
    groups: Validation.Group[]
  ): Validation.Result[] {
    return this.#contents
      .filter(validationGroupPredicate(groups))
      .map(({ validate }) => validate(value, payload))
      .filter(({ valid }) => !valid);
  }

  pop() {
    return this.#contents.pop()!;
  }

  add(rule: Validation.Metadata<TFieldType>) {
    this.#contents.push(rule);
  }
}
