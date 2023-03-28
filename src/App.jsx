import "./App.css";
import { Router } from "./components/Router/Router.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAPI } from "./api/authAPI";
import { initialize, setTalentData, setToken } from "./redux/reducers/authReducer";
import { talentsAPI } from "./api/talentsAPI";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import { setTotalTalents } from "./redux/reducers/talentsReducer";
import { clearGlobalError } from "./redux/reducers/appReducer";

function App() {

	const isInitialized = useSelector(store => store.auth.isInitialized);
	const globalError = useSelector(store => store.app.globalError);
	const globalErrorMessage = useSelector(store => store.app.globalErrorMessage);
	const token = localStorage.getItem("token");
	const dispatch = useDispatch();

	useEffect(() => {
		if (token && (JSON.parse(atob(token.split('.')[1])).exp > Math.floor(Date.now() / 1000))) {
			const getAuth = async () => {
				const response = await authAPI.auth(token);
				dispatch(setToken(token));
				dispatch(setTalentData(response.id, response.name, response.surname, response.avatar));
				dispatch(initialize());
			};

			getAuth()
				.catch(err => console.log(err));
		} else {
			dispatch(initialize());
		}

		const getTotalTalents = async () => {
			const amountResponse = await talentsAPI.getTalents(0, 0);
			dispatch(setTotalTalents(amountResponse.totalAmount));
		};

		getTotalTalents()
			.catch(err => console.log(err));
	}, []);

	const handleClose = (e, reason) => {
		dispatch(clearGlobalError());
	};

	if (!isInitialized) {
		return <LinearProgress />
	}

	return (
		<BrowserRouter>
			<Snackbar
				open={globalError}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert severity="error" onClose={handleClose}>
					{globalErrorMessage}
				</Alert>
			</Snackbar>
			<Router />
		</BrowserRouter>
	);
}

export default App;
