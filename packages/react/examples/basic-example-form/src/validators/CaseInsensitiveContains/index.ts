import { create } from "tdv-core";
import UserForm from "../../models/UserForm";

const CaseInsensitiveContains = (containText: string, ...groups: string[]) => {
  const containTextLowercase = containText.toLowerCase();
  return create<string>(
    (current, _context: UserForm) => ({
      valid: (current ?? "").toLowerCase().includes(containTextLowercase),
      key: "CaseInsensitiveContains",
      message: `Text must contain \"${containTextLowercase}\"`,
    }),
    groups
  );
};

export default CaseInsensitiveContains;
