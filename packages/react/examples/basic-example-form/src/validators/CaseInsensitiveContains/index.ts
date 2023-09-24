import { Rule, Validation } from "tdv-core";
import UserForm from "../../models/UserForm";

const CaseInsensitiveContains = (
  containText: string,
  ...groups: Validation.Group[]
) => {
  const containTextLowercase = containText.toLowerCase();
  return Rule<string>({
    groups,
    isValid: (current, _context: UserForm) => ({
      valid: (current ?? "").toLowerCase().includes(containTextLowercase),
      key: "CaseInsensitiveContains",
      message: `Text must contain \"${containTextLowercase}\"`,
    }),
  });
};

export default CaseInsensitiveContains;
