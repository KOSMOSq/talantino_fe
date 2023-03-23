import "./App.css";
import { Router } from "./components/Router/Router.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
      <Router />
		</BrowserRouter>
	);
}

export default App;
