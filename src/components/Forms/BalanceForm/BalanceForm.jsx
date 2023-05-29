import { useDispatch, useSelector } from "react-redux";
import { kudosAPI } from "../../../api/kudosAPI";
import { setMessage } from "../../../redux/reducers/appReducer";
import { getAuthThunk } from "../../../redux/reducers/authReducer";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CreditCard from "react-credit-card-component";
import "react-credit-card-component/dist/styles-compiled.css";
import { useState } from "react";
import { balanceValidation } from "./balanceValidation";

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
                                ...balanceValidation.cardNumber,
                                onBlur: () => setFocusedField("")
                            })}
                            onFocus={() => setFocusedField("number")}
                            error={Boolean(errors.cardNumber)}
                        />
                        <TextField
                            label="Holder name"
                            {...register("cardName", {
                                ...balanceValidation.cardName,
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
                                    ...balanceValidation.expiryDate,
                                    onBlur: () => setFocusedField("")
                                })}
                                onFocus={() => setFocusedField("expiry")}
                                error={Boolean(errors.expiryDate)}
                            />
                            <TextField
                                label="CVC"
                                sx={{ width: "65px" }}
                                {...register("cvc", {
                                    ...balanceValidation.cvc,
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
                                {...register("kudos", balanceValidation.kudos)}
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
