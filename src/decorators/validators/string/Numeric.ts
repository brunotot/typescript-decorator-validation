import ErrorMessage from "../../../model/const/ErrorMessage";
import Pattern from "./Pattern";

export default function Numeric(message?: string) {
  return Pattern({
    key: "Numeric",
    regex: /^[0-9]+$/,
    message: message ?? ErrorMessage.Numeric(),
  });
}
