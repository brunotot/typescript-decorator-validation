import ValidatorService from "../../../service/ValidatorService";
import InferredType from "../../../constants/InferredType";
import ErrorMessage from "../../../constants/ErrorMessage";

export type TimeProps = {
	locale?: string;
	hour12?: boolean;
	message?: string;
};

const DEFAULT_LOCALE = "en-US";
const DEFAULT_HOUR12 = false;
const DEFAULT_MESSAGE = ErrorMessage.Time(DEFAULT_LOCALE, DEFAULT_HOUR12);

function isValidTime(str: string, locale: string, hour12: boolean): boolean {
	let options: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12,
	};
	let date = new Date(str);
	let formatter = new Intl.DateTimeFormat(locale, options);
	let formatted = formatter.format(date);
	return formatted === str;
}

export default function Time(
	props: TimeProps = {
		locale: DEFAULT_LOCALE,
		hour12: DEFAULT_HOUR12,
		message: DEFAULT_MESSAGE,
	}
) {
	const { locale = DEFAULT_LOCALE, hour12 = DEFAULT_HOUR12 } = props;
	const message = props.message ?? ErrorMessage.Time(locale, hour12);

	return ValidatorService.buildFieldValidatorDecorator<string>({
		expectedType: InferredType.STRING,
		isValid: (value) => ({
			key: "Time",
			message,
			valid: isValidTime(value, locale, hour12),
		}),
	});
}
