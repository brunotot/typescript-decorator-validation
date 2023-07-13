import ValidationHandler from "../../src/handler/ValidationHandler";
import { validators } from "../../src/model/const/Validators";
import { t } from "../../src/model/messages/ErrorMessage";
import "./../../src/global";

class Mock {
  @validators.string.Required()
  value?: string;
}

const handler = new ValidationHandler(Mock);

test("@Required -> string -> invalid", () => {
  const res = handler.validate({ value: "" });
  expect(res.valid).toBe(false);
  expect(res.errors.value.length).toBe(1);
  expect(res.errors.value[0]).toBe(t("Required"));
  expect(res.detailedErrors.value.length).toBe(1);
  expect(res.detailedErrors.value[0].key).toBe("Required");
  expect(res.detailedErrors.value[0].message).toBe(t("Required"));
  expect(res.detailedErrors.value[0].valid).toBe(false);
});

test("@Required -> string -> valid", () => {
  const res = handler.validate({ value: "X" });
  expect(res.valid).toBe(true);
  expect(res.errors.value.length).toBe(0);
  expect(res.detailedErrors.value.length).toBe(0);
});
