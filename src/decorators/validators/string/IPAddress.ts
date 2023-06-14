import ErrorMessage from "../../../model/const/ErrorMessage";
import Pattern from "./Pattern";

export default function IPAddress(message?: string) {
  return Pattern({
    key: "IPAddress",
    regex:
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    message: message ?? ErrorMessage.IPAddress(),
  });
}
