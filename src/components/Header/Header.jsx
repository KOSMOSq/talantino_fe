import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { AuthView } from "./components/AuthView";
import { AppBarItems } from "./components/AppBarItems";

function Header() {
	return (
		<>
			<AppBar position="static" color="transparent">
				<Toolbar sx={{ display: "flex" }}>
					<AppBarItems />
					<AuthView />
				</Toolbar>
			</AppBar>
		</>
	);
}

export { Header };
