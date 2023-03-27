export const mailValidation = {
	required: "Email is required",
	pattern: {
		value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
		message: "Invalid email address",
	},
};
