import { useDispatch, useSelector } from "react-redux";
import { kudosAPI } from "../../../api/kudosAPI";
import { setMessage } from "../../../redux/reducers/appReducer";
import { getAuthThunk } from "../../../redux/reducers/authReducer";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CreditCard from "react-credit-card-component";
import "react-credit-card-component/dist/styles-compiled.css";
import { useState } from "react";

const BalanceForm = () => {
    const [focusedField, setFocusedField] = useState("");

    const token = useSelector(store => store.auth.token);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({
        mode: "all",
        defaultValues: {
            cvc: "",
            cardName: "",
            cardNumber: "",
            expiryDate: ""
        }
    });

    const onSubmit = async data => {
        try {
            await kudosAPI.addKudos(token, data.kudos);
            dispatch(
                setMessage(
                    `${data.kudos} kudos succesfully added to your account!`,
                    "success"
                )
            );
            dispatch(getAuthThunk());
        } catch (err) {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        } finally {
            reset();
        }
    };

    return (
        <>
            <Box
                display="flex"
                gap={4}
                alignItems="center"
                sx={{ marginTop: "32px", marginLeft: "64px" }}
            >
                <Box
                    sx={{ width: "300px", textAlign: "center" }}
                    onClick={() =>
                        setFocusedField(prev => (prev === "cvc" ? "" : "cvc"))
                    }
                >
                    <CreditCard
                        cvc={watch("cvc").slice(0, 4)}
                        expiry={watch("expiryDate").slice(0, 5)}
                        focused={focusedField}
                        name={watch("cardName")}
                        number={watch("cardNumber").slice(0, 16)}
                        locale={{ valid: "GOOD THRU" }}
                        acceptedCards={[
                            "visa",
                            "mastercard",
                            "maestro",
                            "discover",
                            "jcb",
                            "unionpay",
                            "hipercard"
                        ]}
                    />
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            sx={{ width: "220px" }}
                            label="Card number"
                            {...register("cardNumber", {
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
                                    message:
                                        "Card number can only contain numbers!"
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
                                        .reduce(
                                            (accum, num) => Number(num) + accum,
                                            0
                                        ) +
                                        secondDigits) %
                                        10 ===
                                        0
                                        ? true
                                        : "Card number is not valid!";
                                },
                                onBlur: () => setFocusedField("")
                            })}
                            onFocus={() => setFocusedField("number")}
                            error={Boolean(errors.cardNumber)}
                        />
                        <TextField
                            label="Holder name"
                            {...register("cardName", {
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
                                    message:
                                        "Holder name can only contain letters"
                                },
                                onBlur: () => setFocusedField("")
                            })}
                            onFocus={() => setFocusedField("name")}
                            error={Boolean(errors.cardName)}
                        />
                        <Box display="flex" gap={3}>
                            <TextField
                                label="Expiry date"
                                sx={{ width: "131px" }}
                                {...register("expiryDate", {
                                    required: {
                                        value: true,
                                        message: "Date is required"
                                    },
                                    minLength: {
                                        value: 4,
                                        message:
                                            "Date should be at least 4 numbers long"
                                    },
                                    maxLength: {
                                        value: 4,
                                        message:
                                            "Date cannot be longer than 4 numbers"
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message:
                                            "Date can only contain numbers!"
                                    },
                                    validate: value => {
                                        const month = Number(value.slice(0, 2));
                                        const year = Number(value.slice(2, 4));
                                        const now = new Date();
                                        const nowYear = Number(
                                            now
                                                .getFullYear()
                                                .toString()
                                                .slice(2, 4)
                                        );
                                        if (month > 12 || month < 1) {
                                            return "Your month is not valid!";
                                        } else if (
                                            year === nowYear
                                                ? month < now.getMonth() + 1
                                                : month < 1
                                        ) {
                                            return "Your card is expired!";
                                        } else if (year < nowYear) {
                                            return "Your card is expired!";
                                        }
                                    },
                                    onBlur: () => setFocusedField("")
                                })}
                                onFocus={() => setFocusedField("expiry")}
                                error={Boolean(errors.expiryDate)}
                            />
                            <TextField
                                label="CVC"
                                sx={{ width: "65px" }}
                                {...register("cvc", {
                                    required: {
                                        value: true,
                                        message: "CVC is required"
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            "CVC should be at least 3 numbers long"
                                    },
                                    maxLength: {
                                        value: 4,
                                        message:
                                            "CVC cannot be longer than 4 numbers"
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "CVC can only contain numbers!"
                                    },
                                    onBlur: () => setFocusedField("")
                                })}
                                onFocus={() => setFocusedField("cvc")}
                                error={Boolean(errors.cvc)}
                            />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <TextField
                                sx={{ width: "220px" }}
                                label="Kudos"
                                {...register("kudos", {
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
                                })}
                                error={Boolean(errors.kudos)}
                            />
                            <FormHelperText
                                error
                                component="span"
                                sx={{
                                    height: "20px",
                                    width: "220px"
                                }}
                            >
                                {errors.cardNumber?.message ||
                                    errors.cardName?.message ||
                                    errors.expiryDate?.message ||
                                    errors.cvc?.message ||
                                    errors.kudos?.message ||
                                    " "}
                            </FormHelperText>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ marginTop: "-8px", width: "220px" }}
                        >
                            ADD KUDOS
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export { BalanceForm };
