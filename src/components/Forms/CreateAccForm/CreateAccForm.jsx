import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { authAPI } from "../../../api/authAPI";
import { mailValidation } from "../validation";

function CreateAccForm() {
	const {
		register,
		getValues,
		handleSubmit,
		clearErrors,
		setError,
		reset,
		formState: { errors, isValid },
	} = useForm({ mode: "onTouched" });

	const onSubmit = async (data) => {
		const response = await authAPI.register({
			email: data.email,
			password: data.password,
			name: data.fName,
			surname: data.lName,
			kind: data.kindOfTalent,
		});
		console.log(response);
		reset();
	};

	return (
		<>
			<Container
				sx={{
					width: 670,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						id="fName"
						label="First name"
						type="text"
						{...register("fName", {
							required: "First name is required",
							pattern: {
								value: /[a-zA-Z]$/,
								message: "First name can only contain letters",
							},
						})}
						error={Boolean(errors.fName)}
						helperText={errors.fName ? errors.fName.message : " "}
						sx={{ marginTop: 2, width: 300, marginRight: 2 }}
					/>
					<TextField
						id="lName"
						label="Last name"
						type="text"
						{...register("lName", {
							required: "Last name is required",
							pattern: {
								value: /[a-zA-Z]$/,
								message: "Last name can only contain letters",
							},
						})}
						error={Boolean(errors.lName)}
						helperText={errors.lName ? errors.lName.message : " "}
						sx={{ marginTop: 2, width: 300 }}
					/>
					<TextField
						id="email"
						label="Email"
						{...register("email", mailValidation)}
						error={Boolean(errors.email)}
						helperText={errors.email ? errors.email.message : " "}
						sx={{ marginTop: 2, width: 616 }}
					/>

					<TextField
						id="password"
						label="Password"
						type="password"
						{...register("password", {
							required: "Password is required",
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_@$!%*#?&]{8,}$/,
								message: "Your pass doesn't meet requirments",
							},
							validate: (value) => {
								const cpassword = getValues("cpassword");
								const check = cpassword === value;
								if (check) {
									clearErrors("cpassword");
								} else {
									setError("password", {
										type: "custom",
										message: "Passwords should match!",
									});
								}
								return check || "Passwords should match!";
							},
						})}
						error={Boolean(errors.password)}
						helperText={
							errors.password
								? errors.password.message
								: "Use 8 or more characters with letters, numbers"
						}
						sx={{ marginTop: 2, width: 300, marginRight: 2 }}
					/>
					<TextField
						id="cpassword"
						label="Confirm password"
						type="password"
						{...register("cpassword", {
							required: "Confirm password is required",
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_@$!%*#?&]{8,}$/,
								message: "Your pass doesn't meet requirments",
							},
							validate: (value) => {
								const password = getValues("password");
								const check = password === value;
								if (check) {
									clearErrors("password");
								} else {
									setError("cpassword", {
										type: "custom",
										message: "Passwords should match!",
									});
								}
								return check || "Passwords should match!";
							},
						})}
						error={Boolean(errors.cpassword)}
						helperText={errors.cpassword ? errors.cpassword.message : " "}
						sx={{ marginTop: 2, width: 300 }}
					/>

					<TextField
						id="kindOfTalent"
						label="Kind of Talent"
						type="text"
						{...register("kindOfTalent", {
							required: "Kind of talent is required",
							pattern: {
								value: /[a-zA-Z]$/,
								message: "Kind of talent can only contain letters",
							},
						})}
						error={Boolean(errors.kindOfTalent)}
						helperText={errors.kindOfTalent ? errors.kindOfTalent.message : " "}
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
							marginLeft: 19,
						}}
					>
						Create account
					</Button>
					<Typography sx={{ display: "block", marginTop: 2, marginLeft: 23 }}>
						Already have an account? <Link to="/login">Log in</Link>
					</Typography>
				</form>
			</Container>
		</>
	);
}

export { CreateAccForm };
