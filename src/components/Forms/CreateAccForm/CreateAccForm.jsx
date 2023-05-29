import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    Container,
    LinearProgress,
    InputAdornment,
    IconButton,
    Stack
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    registerThunk,
    setIsOpenEmailModal
} from "../../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ModalConfirmation } from "../../ModalConfirmation/ModalConfirmation";
import { RoleSwitch } from "./components/RoleSwitch/RoleSwitch";
import { createAccValidaton } from "./createAccValidation";

function CreateAccForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [checkedTalent, setCheckedTalent] = useState(true);

    const {
        register,
        getValues,
        handleSubmit,
        clearErrors,
        setError,
        reset,
        trigger,
        formState: { errors, isValid, isDirty }
    } = useForm({ mode: "onTouched" });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.auth.isLoading);
    const isOpenEmailModal = useSelector(store => store.auth.isOpenEmailModal);

    const onSubmit = data => {
        if (checkedTalent) {
            dispatch(registerThunk(data, "TALENT"));
        } else {
            dispatch(registerThunk(data, "SPONSOR"));
        }
        reset();
    };

    const handleSwitch = async () => {
        setCheckedTalent(prev => !prev);
        if (isDirty) {
            await trigger();
        }
    };

    return (
        <>
            {isLoading ? <LinearProgress /> : null}
            <Container
                sx={{
                    width: 670,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="fName"
                        label="First name"
                        type="text"
                        {...register("fName", createAccValidaton.fName)}
                        error={Boolean(errors.fName)}
                        helperText={errors.fName ? errors.fName.message : " "}
                        sx={{ marginTop: 2, width: 300, marginRight: 2 }}
                    />
                    <TextField
                        id="lName"
                        label="Last name"
                        type="text"
                        {...register("lName", createAccValidaton.lName)}
                        error={Boolean(errors.lName)}
                        helperText={errors.lName ? errors.lName.message : " "}
                        sx={{ marginTop: 2, width: 300 }}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        {...register("email", createAccValidaton.email)}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.message : " "}
                        sx={{ marginTop: 2, width: 616 }}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register(
                            "password",
                            createAccValidaton.getPasswordValidation(
                                getValues,
                                setError,
                                clearErrors
                            )
                        )}
                        error={Boolean(errors.password)}
                        helperText={
                            errors.password
                                ? errors.password.message
                                : "Use 8 or more characters with letters, numbers"
                        }
                        sx={{ marginTop: 2, width: 300, marginRight: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setShowPassword(show => !show)
                                        }
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        id="cpassword"
                        label="Confirm password"
                        type={showPasswordCheck ? "text" : "password"}
                        {...register(
                            "cpassword",
                            createAccValidaton.getCPasswordValidation(
                                getValues,
                                setError,
                                clearErrors
                            )
                        )}
                        error={Boolean(errors.cpassword)}
                        helperText={
                            errors.cpassword ? errors.cpassword.message : " "
                        }
                        sx={{ marginTop: 2, width: 300 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setShowPasswordCheck(show => !show)
                                        }
                                        edge="end"
                                    >
                                        {showPasswordCheck ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TextField
                            id="kindOfTalent"
                            label="Kind of Talent"
                            type="text"
                            {...register("kindOfTalent", {
                                ...createAccValidaton.kindOfTalent,
                                disabled: !checkedTalent
                            })}
                            error={Boolean(errors.kindOfTalent)}
                            helperText={
                                errors.kindOfTalent
                                    ? errors.kindOfTalent.message
                                    : " "
                            }
                            sx={{
                                marginTop: 2,
                                width: 300,
                                marginRight: 5,
                                marginLeft: 5
                            }}
                        />
                        <RoleSwitch
                            checkedTalent={checkedTalent}
                            handleSwitch={handleSwitch}
                        />
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                        sx={{
                            display: "block",
                            width: 300,
                            padding: 2,
                            marginTop: 2,
                            marginLeft: 19
                        }}
                    >
                        Create account
                    </Button>
                    <Typography
                        sx={{ display: "block", marginTop: 2, marginLeft: 23 }}
                    >
                        Already have an account? <Link to="/login">Log in</Link>
                    </Typography>
                </form>
                <ModalConfirmation
                    title="We have sent you a letter to the specified mailbox with a request to confirm it."
                    description="To complete the registration process, please follow the link in this email. Please check your mailbox, including your Spam folder, if the email did not appear in your inbox."
                    infoDialog
                    open={isOpenEmailModal}
                    handleClose={() => dispatch(setIsOpenEmailModal(false))}
                    handleArgee={() => navigate("/talents")}
                />
            </Container>
        </>
    );
}

export { CreateAccForm };
