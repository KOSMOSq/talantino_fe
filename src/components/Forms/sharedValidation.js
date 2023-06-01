export const sharedValidation = {
    email: {
        required: "Email is required",
        maxLength: {
            value: 100,
            message: "Your email is too long"
        },
        pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Invalid email address"
        }
    },
    proofTitle: {
        required: "Title should be at least 2 symbols long",
        minLength: {
            value: 2,
            message: "Title should be at least 2 symbols long"
        },
        maxLength: {
            value: 160,
            message: "Title shouldn't be larger than 160 symbols"
        }
    },
    proofDescription: {
        required: "Proof should be at least 2 symbols long",
        minLength: {
            value: 2,
            message: "Proof should be at least 2 symbols long"
        },
        maxLength: {
            value: 2000,
            message: "Proof shouldn't be larger than 2000 symbols"
        }
    }
};
