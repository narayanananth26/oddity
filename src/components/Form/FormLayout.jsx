import { Form, Formik } from "formik";

const FormLayout = ({
	initialValues,
	validationSchema,
	onSubmit,
	children,
}) => {
	return (
		<div className="flex-center h-auto">
			<div className="rounded px-5 py-10 w-80">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					<Form className="flex flex-col gap-4 w-full">
						{children}
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default FormLayout;
