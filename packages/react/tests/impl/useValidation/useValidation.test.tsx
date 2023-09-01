import { renderHook } from "@testing-library/react-hooks";
import { validators } from "tdv-core";
import useValidation from "../../../src/hooks/useValidation";
import "../../global";

jest.spyOn(console, "error").mockImplementation(() => {});

class TestForm {
  @validators.string.Required()
  username!: string;
}

test("first render error, second render success", async () => {
  const { result, waitForNextUpdate } = renderHook(
    () =>
      useValidation({
        model: TestForm,
      }),
    {
      initialProps: undefined,
      wrapper: undefined,
    }
  );

  expect(result.current).toHaveProperty("errors.username");
  expect(result.current.errors.username).toHaveLength(1);

  result.current.setForm({
    username: "value",
  });

  await waitForNextUpdate();

  expect(result.current.errors.username).toHaveLength(0);
});
