import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";
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
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
								message: "Invalid email address",
							},
						})}
						error={Boolean(errors.email)}
						helperText={errors.email && errors.email.message}
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
								message: "Your pass doesn't meet requirments",
							},
						})}
						error={Boolean(errors.password)}
						helperText={errors.password && errors.password.message}
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
