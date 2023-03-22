import { useForm } from "react-hook-form";
import { Button, FormLabel, Input, Typography } from "@mui/material";

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
			<Typography>Login</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormLabel sx={{ display: "block" }}>Mail</FormLabel>
				<Input
					{...register("mail", {
						required: "Введите почту для входа.",
						pattern: {
							value: /^[A-Za-z0-9+_.-]+@(.+)$/,
							message: "Введенна неправильна почта!",
						},
					})}
					placeholder="Enter mail here!"
				/>
				{errors.mail && <p>{errors.mail.message}</p>}
				<FormLabel sx={{ display: "block" }}>Password</FormLabel>
				<Input
					{...register("password", {
						required: "Введите пароль для входа.",
						minLength: { value: 8, message: "Слишком короткий пароль!" },
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
							message:
								"Пароль должен содержать минимум одну букву, одну цифру и один специальный символ!",
						},
					})}
					placeholder="Enter password here!"
				/>
				{errors.password && <p>{errors.password.message}</p>}

				<Button type="submit" disabled={!isValid} sx={{ display: "block" }}>
					Войти
				</Button>
			</form>
		</>
	);
}

export { LoginForm };
