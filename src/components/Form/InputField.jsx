import { Field } from "formik";

const InputField = ({ type, name, placeholder }) => {
	return (
		<Field id={name} name={name}>
			{({ field, meta: { touched, error } }) => (
				<input
					type={type}
					placeholder={placeholder}
					className={`focus:outline-none focus:border-none focus:ring text-slate-700 bg-red-50 focus:ring-slate-200 transition-all placeholder:text-slate-500 rounded-sm border-b py-1 px-2 ${
						touched && error ? "border-red-600" : "border-slate-400"
					}`}
					{...field}
				/>
			)}
		</Field>
	);
};

export default InputField;
