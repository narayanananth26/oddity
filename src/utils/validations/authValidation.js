import * as Yup from "yup";

export const registerValidation = Yup.object({
	username: Yup.string()
		.min(3, "Username must be at least 3 characters")
		.required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[0-9]/, "Password must contain at least one number")
		.matches(
			/[!@#$%^&*(),.?":{}|<>]/,
			"Password must contain at least one special character"
		)
		.required("Password is required"),
});

export const signInValidation = Yup.object({
	emailOrUsername: Yup.string().required("Email or username is required"),
	password: Yup.string().required("Password is required"),
});

export const forgotPasswordValidation = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
});
