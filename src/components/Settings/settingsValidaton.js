export const settingsValidation = {
    name: {
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
    surname: {
        required: "Last name is required",
        maxLength: {
            value: 24,
            message: "Your surname is too long"
        },
        minLength: {
            value: 2,
            message: "Your surname is too short"
        },
        pattern: {
            value: /^[a-zA-Z]+$/,
            message: "Last name can only contain letters"
        }
    },
    description: {
        maxLength: {
            value: 3000,
            message: "Your description is too long"
        },
        minLength: {
            value: 2,
            message: "Your description is too short"
        }
    },
    kind: {
        required:
            "Kind of talent is required",
        maxLength: {
            value: 18,
            message:
                "Your talent is too BIG"
        },
        minLength: {
            value: 2,
            message:
                "Your talent is too short"
        },
        pattern: {
            value: /^[a-zA-Z ]+$/,
            message:
                "Kind of talent can only contain letters"
        }
    },
    experience: {
        validate: value =>
            (Number(value) <= 60 &&
                Number(value) >= 0) ||
            "You have too much experience XD",
        pattern: {
            value: /^[0-9]+$/,
            message:
                "Experience can only contain numbers"
        }
    }
};
