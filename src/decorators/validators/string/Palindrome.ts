import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../model/enum/InferredType";
import ErrorMessage from "../../../model/const/ErrorMessage";

function isPalindrome(str: string): boolean {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return str === str.split("").reverse().join("");
}

export default function Palindrome(message?: string) {
  return ValidatorService.buildFieldValidatorDecorator<string>({
    expectedType: InferredType.STRING,
    isValid: (value) => ({
      key: "Palindrome",
      message: message ?? ErrorMessage.Palindrome(),
      valid: isPalindrome(value),
    }),
  });
}
