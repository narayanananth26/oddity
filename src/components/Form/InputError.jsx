import { ErrorMessage } from "formik";

const InputError = ({ name }) => {
	return (
		<ErrorMessage
			name={name}
			component="div"
			className="text-sm text-red-600"
		/>
	);
};

export default InputError;
