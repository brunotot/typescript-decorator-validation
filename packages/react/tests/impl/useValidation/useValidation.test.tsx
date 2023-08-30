import { renderHook } from "@testing-library/react-hooks";
import { validators } from "tdv-core";
import useValidation from "../../../src/hooks/useValidation";
import "./../../global";

jest.spyOn(console, "error").mockImplementation(() => {});

class TestForm {
  @validators.string.Required()
  username!: string;
}

test("first render error, second render success", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useValidation({
      model: TestForm,
    })
  );

  const hook = result.current;

  expect(hook).toHaveProperty("errors.username");
  expect(hook.errors.username).toHaveLength(1);

  hook.setForm({
    username: "value",
  });

  await waitForNextUpdate();

  expect(hook.errors.username).toHaveLength(0);
});
