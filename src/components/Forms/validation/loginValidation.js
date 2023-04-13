export const loginValidation = {
    password: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Password should be at least 8 characters"
        },
        maxLength: {
            value: 64,
            message: "Your password is to long"
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_@$!%*#?&]{8,}$/,
            message: "Your password doesn't meet requirements"
        }
    }
};
