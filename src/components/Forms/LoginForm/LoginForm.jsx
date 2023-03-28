import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../api/authAPI";
import { mailValidation } from "../validation";
import { useDispatch, useSelector } from "react-redux";
import { setTalentData, setToken } from "../../../redux/reducers/authReducer";
import { useEffect } from "react";

function LoginForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({ mode: "onTouched" });
	const dispatch = useDispatch();
	const isAuth = useSelector((store) => store.auth.isAuth);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate(`/talents`);
		}
	}, [isAuth, navigate]);

	const onSubmit = async (data) => {
		const response = await authAPI.login({
			email: data.email,
			password: data.password,
		});
		localStorage.setItem("token", response.token);
		dispatch(setToken(response.token));
		const talentResponse = await authAPI.auth(response.token);
		dispatch(
			setTalentData(
				response.id,
				response.name,
				response.surname,
				response.avatar
			)
		);
		reset();
	};

	return (
		<>
			<Container
				sx={{
					width: 300,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						id="email"
						label="Email"
						{...register("email", mailValidation)}
						error={Boolean(errors.email)}
						helperText={errors.email ? errors.email.message : " "}
						sx={{ width: 300 }}
					/>

					<TextField
						id="password"
						label="Password"
						type="password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 8,
								message: "Password should be at least 8 characters",
							},
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_@$!%*#?&]{8,}$/,
								message: "Your pass doesn't meet requirments",
							},
						})}
						error={Boolean(errors.password)}
						helperText={
							errors.password
								? errors.password.message
								: "Use 8 or more characters with letters, numbers"
						}
						sx={{ marginTop: 2, width: 300 }}
					/>
					<Button
						type="submit"
						variant="contained"
						disabled={!isValid}
						sx={{ display: "block", width: 300, padding: 2, marginTop: 2 }}
					>
						Login
					</Button>
					<Typography sx={{ display: "block", marginTop: 2, marginLeft: 7 }}>
						No account? <Link to="/create-acc">Create one</Link>
					</Typography>
				</form>
			</Container>
		</>
	);
}

export { LoginForm };
