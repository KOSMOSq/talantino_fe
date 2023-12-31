import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    Typography,
    Container,
    LinearProgress,
    IconButton,
    InputAdornment
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../redux/reducers/authReducer";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginValidation } from "./loginValidation";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm({ mode: "onTouched" });

    const location = useLocation();
    const from = location.state?.from;
    const page = location.state?.page;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(store => store.auth.isAuth);
    const clickedId = useSelector(store => store.talents.clickedId);
    const isLoading = useSelector(store => store.auth.isLoading);

    useEffect(() => {
        if (isAuth && from !== "proofs") {
            navigate(`/talent${clickedId ? `/${clickedId}` : "s"}`);
        } else if (isAuth) {
            navigate(`/proofs${page ? `?page=${page}` : ""}`);
        }
    }, [isAuth]);

    const onSubmit = async data => {
        dispatch(loginThunk(data));
        reset();
    };

    return (
        <>
            {isLoading ? <LinearProgress /> : null}
            <Container
                sx={{
                    width: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="email"
                        label="Email"
                        {...register("email", loginValidation.email)}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.message : " "}
                        sx={{ width: 300 }}
                    />

                    <TextField
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password", loginValidation.password)}
                        error={Boolean(errors.password)}
                        helperText={
                            errors.password
                                ? errors.password.message
                                : "Use 8 or more characters with letters, numbers"
                        }
                        sx={{ marginTop: 2, width: 300 }}
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
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                        sx={{
                            display: "block",
                            width: 300,
                            padding: 2,
                            marginTop: 2
                        }}
                    >
                        Login
                    </Button>
                    <Typography
                        sx={{ display: "block", marginTop: 2, marginLeft: 7 }}
                    >
                        No account? <Link to="/create-acc">Create one</Link>
                    </Typography>
                </form>
            </Container>
        </>
    );
}

export { LoginForm };
