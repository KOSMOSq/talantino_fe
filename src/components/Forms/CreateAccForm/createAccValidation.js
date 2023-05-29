import { sharedValidation } from "../sharedValidation";

export const createAccValidaton = {
    fName: {
        required: "First name is required",
        maxLength: {
            value: 24,
            message: "Your name is too long"
        },
        minLength: {
            value: 2,
            message: "Your name is too short"
        },
        pattern: {
            value: /^[a-zA-Z]+$/,
            message: "First name can only contain letters"
        }
    },
    lName: {
        required: "First name is required",
        maxLength: {
            value: 24,
            message: "Your name is too long"
        },
        minLength: {
            value: 2,
            message: "Your name is too short"
        },
        pattern: {
            value: /^[a-zA-Z]+$/,
            message: "First name can only contain letters"
        }
    },
    email: sharedValidation.email,
    kindOfTalent: {
        required: {
            value: true,
            message: "Kind of talent is required"
        },
        maxLength: {
            value: 18,
            message: "Your talent is to BIG"
        },
        minLength: {
            value: 2,
            message: "Your talent is to short"
        },
        pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Kind of talent can only contain letters"
        }
    },
    getPasswordValidation: (getValues, setError, clearErrors) => {
        return {
            required: "Password is required",
            maxLength: {
                value: 64,
                message: "Your password is to long"
            },
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_@$!%*#?&]{8,}$/,
                message: "Your pass doesn't meet requirments"
            },
            validate: value => {
                const cpassword = getValues("cpassword");
                const check = cpassword === value;
                if (check) {
                    clearErrors("cpassword");
                } else {
                    setError("password", {
                        type: "custom",
                        message: "Passwords should match!"
                    });
                }
                return check || "Passwords should match!";
            }
        };
    },
    getCPasswordValidation: (getValues, setError, clearErrors) => {
        return {
            required: "Confirm password is required",
            maxLength: {
                value: 64,
                message: "Your password is to long"
            },
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_@$!%*#?&]{8,}$/,
                message: "Your pass doesn't meet requirments"
            },
            validate: value => {
                const password = getValues("password");
                const check = password === value;
                if (check) {
                    clearErrors("password");
                } else {
                    setError("cpassword", {
                        type: "custom",
                        message: "Passwords should match!"
                    });
                }
                return check || "Passwords should match!";
            }
        };
    }
};
