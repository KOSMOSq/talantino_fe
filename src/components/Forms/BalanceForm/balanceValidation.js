export const balanceValidation = {
    cardNumber: {
        required: {
            value: true,
            message: "Enter a card number!"
        },
        minLength: {
            value: 13,
            message: "Your card number is to short!"
        },
        maxLength: {
            value: 16,
            message: "Your card number is to long!"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "Card number can only contain numbers!"
        },
        validate: cardNum => {
            let firstDigits = "";
            let secondDigits = 0;
            cardNum.split("").forEach((num, index) => {
                if (index % 2 === 0) {
                    firstDigits += num * 2;
                } else {
                    secondDigits += Number(num);
                }
            });
            return (firstDigits
                .split("")
                .reduce((accum, num) => Number(num) + accum, 0) +
                secondDigits) %
                10 ===
                0
                ? true
                : "Card number is not valid!";
        }
    },
    cardName: {
        required: "Holder name is required",
        maxLength: {
            value: 48,
            message: "Your name is too long"
        },
        minLength: {
            value: 2,
            message: "Your name is too short"
        },
        pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Holder name can only contain letters"
        }
    },
    expiryDate: {
        required: {
            value: true,
            message: "Date is required"
        },
        minLength: {
            value: 4,
            message: "Date should be at least 4 numbers long"
        },
        maxLength: {
            value: 4,
            message: "Date cannot be longer than 4 numbers"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "Date can only contain numbers!"
        },
        validate: value => {
            const month = Number(value.slice(0, 2));
            const year = Number(value.slice(2, 4));
            const now = new Date();
            const nowYear = Number(now.getFullYear().toString().slice(2, 4));
            if (month > 12 || month < 1) {
                return "Your month is not valid!";
            } else if (
                year === nowYear ? month < now.getMonth() + 1 : month < 1
            ) {
                return "Your card is expired!";
            } else if (year < nowYear) {
                return "Your card is expired!";
            }
        }
    },
    cvc: {
        required: {
            value: true,
            message: "CVC is required"
        },
        minLength: {
            value: 3,
            message: "CVC should be at least 3 numbers long"
        },
        maxLength: {
            value: 4,
            message: "CVC cannot be longer than 4 numbers"
        },
        pattern: {
            value: /^[0-9]+$/,
            message: "CVC can only contain numbers!"
        }
    },
    kudos: {
        required: "Kudos field is requeired!",
        min: {
            value: 1,
            message:
                "You cannot add 0 or less kudos to your balance!"
        },
        max: {
            value: 1000,
            message:
                "You are not a billionaire, calm down :)"
        },
        pattern: {
            value: /^[0-9]+$/,
            message:
                "Kudos can only contain numbers!"
        }
    }
};
