import InputError from "./InputError";
import InputField from "./InputField";

const FormField = ({ label, type, name, placeholder }) => {
	return (
		<div className="flex gap-2">
			<label htmlFor={name} className="justify-center py-2">
				{label}
			</label>
			<div className="flex flex-col gap-0.5 w-full">
				<InputField type={type} name={name} placeholder={placeholder} />
				<InputError name={name} />
			</div>
		</div>
	);
};

export default FormField;
