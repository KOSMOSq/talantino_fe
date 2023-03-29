export const mailValidation = {
	required: "Email is required",
	maxLength: {
		value: 100,
		message: "Your email is to long"
	},
	pattern: {
		value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
		message: "Invalid email address",
	},
};
