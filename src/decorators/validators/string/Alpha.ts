import ErrorMessage from "../../../model/const/ErrorMessage";
import Pattern from "./Pattern";

export default function Alpha(message?: string) {
  return Pattern({
    key: "Alpha",
    regex: /^[a-zA-Z]+$/,
    message: message ?? ErrorMessage.Alpha(),
  });
}
