import ValidatorService from "../../../service/ValidatorService";
import ErrorMessage from "../../../model/const/ErrorMessage";
import InferredType from "../../../model/enum/InferredType";

// TODO: Separate CollectionSize and StringSize

export type SizeMessageProps = {
  message?: string;
};

export type SizeMinProps = {
  min: number;
  max?: number;
  exact?: never;
};

export type SizeMaxProps = {
  min?: number;
  max: number;
  exact?: never;
};

export type SizeExactProps = {
  min?: never;
  max?: never;
  exact: number;
};

export type SizeProps = SizeMessageProps &
  (SizeMinProps | SizeMaxProps | SizeExactProps);

export default function Size(props: SizeProps) {
  const { min = 0, max = Infinity, exact } = props;
  const message = props.message ?? ErrorMessage.Size(min, max, exact);
  return ValidatorService.buildFieldValidatorDecorator<any[] | string>({
    expectedType: [InferredType.ARRAY, InferredType.STRING],
    isValid: (arrayOrString) => ({
      key: "Size",
      message,
      valid:
        exact === undefined
          ? arrayOrString?.length >= min && arrayOrString?.length <= max
          : arrayOrString?.length === exact,
    }),
  });
}
