import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    Container,
    LinearProgress,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
    mailValidation,
    sharedValidation
} from "../validation/sharedValidation";
import { useEffect, useState } from "react";
import { registerThunk } from "../../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createAccValidation } from "../validation/createAccValidation";

function CreateAccForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);

    const {
        register,
        getValues,
        handleSubmit,
        clearErrors,
        setError,
        reset,
        formState: { errors, isValid }
    } = useForm({ mode: "onTouched" });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.auth.isLoading);
    const isAuth = useSelector(store => store.auth.isAuth);

    useEffect(() => {
        if (isAuth) {
            navigate(`/settings`);
        }
    }, [isAuth]);

    const onSubmit = data => {
        dispatch(registerThunk(data));
        reset();
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
                        {...register("fName", createAccValidation.fName)}
                        error={Boolean(errors.fName)}
                        helperText={errors.fName ? errors.fName.message : " "}
                        sx={{ marginTop: 2, width: 300, marginRight: 2 }}
                    />
                    <TextField
                        id="lName"
                        label="Last name"
                        type="text"
                        {...register("lName", createAccValidation.lName)}
                        error={Boolean(errors.lName)}
                        helperText={errors.lName ? errors.lName.message : " "}
                        sx={{ marginTop: 2, width: 300 }}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        {...register("email", sharedValidation.mail)}
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
                            createAccValidation.passwordValidationGenerator(
                                getValues,
                                clearErrors,
                                setError
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
                        {...register("cpassword", createAccValidation.cpasswordValidationGenerator(
                            getValues,
                            clearErrors,
                            setError
                        ))}
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
                    <TextField
                        id="kindOfTalent"
                        label="Kind of Talent"
                        type="text"
                        {...register("kindOfTalent", createAccValidation.kindOfTalent)}
                        error={Boolean(errors.kindOfTalent)}
                        helperText={
                            errors.kindOfTalent
                                ? errors.kindOfTalent.message
                                : " "
                        }
                        sx={{ marginTop: 2, width: 300, marginLeft: 19 }}
                    />

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
            </Container>
        </>
    );
}

export { CreateAccForm };
