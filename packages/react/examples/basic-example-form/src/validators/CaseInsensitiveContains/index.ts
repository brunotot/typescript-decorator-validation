import { create } from "tdv-core";
import UserForm from "../../models/UserForm";

const CaseInsensitiveContains = (containText: string, ...groups: string[]) => {
  const containTextLowercase = containText.toLowerCase();
  return create<string>({
    groups,
    isValid: (current, _context: UserForm) => ({
      valid: (current ?? "").toLowerCase().includes(containTextLowercase),
      key: "CaseInsensitiveContains",
      message: `Text must contain \"${containTextLowercase}\"`,
    }),
  });
};

export default CaseInsensitiveContains;
