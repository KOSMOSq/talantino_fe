import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function LoginForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({ mode: "onBlur" });

	const onSubmit = (data) => {
		console.log(data);
		reset();
	};

	return (
		<>
			<Box
				sx={{
					width: 400,
					position: "absolute",
					top: "52%",
					left: "52%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						id="email"
						label="Email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
								message: "Invalid email address",
							},
						})}
						helperText={errors.email && <p>{errors.email.message}</p>}
						sx={{ width: 300 }}
					/>

					<TextField
						id="password"
						label="Password"
						type="password"
						{...register("password", {
							required: "Password is required",
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message: "Invalid password",
							},
						})}
						helperText={errors.password && <p>{errors.password.message}</p>}
						sx={{ marginTop: 2, width: 300 }}
					/>

					<Button
						type="submit"
						variant="contained"
						disabled={!isValid}
						// sx={{ display: "block", width: 150, marginLeft: 10, marginTop: 2 }}
						sx={{ display: "block", width: 300, padding: 2, marginTop: 2 }}
					>
						Login
					</Button>
					<Typography sx={{ display: "block", marginTop: 2, marginLeft: 7 }}>
						No account? <Link to="/create-acc">Create one</Link>
					</Typography>
				</form>
			</Box>
		</>
	);
}

export { LoginForm };
