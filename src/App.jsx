import "./App.css";
import { Router } from "./components/Router/Router.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAPI } from "./api/authAPI";
import { initialize, setTalentData, setToken } from "./redux/reducers/authReducer";
import { talentsAPI } from "./api/talentsAPI";

function App() {

	const isInitialized = useSelector(store => store.auth.isInitialized);
	const token = localStorage.getItem("token");
	const dispatch = useDispatch();

	useEffect(() => {
		const getAuth = async () => {
			const response = await authAPI.auth(token);
			const amountResponse = await talentsAPI.getTalents(0, 0);
			//!TODO: NEED TO IMPLEMENT NEW REDUCER TO STORE TOTAL AMOUNT OF TALENTS
			dispatch(setToken(token));
			dispatch(setTalentData(response.id, response.name, response.surname, response.avatar));
			dispatch(initialize());
		};

		getAuth()
			.catch(err => {
				if (err.response.status === 401) {
					dispatch(initialize());
				}
			});
	}, []);

	if (!isInitialized) {
		return <h1>INITIALIZINK</h1>
	}

	return (
			<BrowserRouter>
				<Router />
			</BrowserRouter>
	);
}

export default App;
