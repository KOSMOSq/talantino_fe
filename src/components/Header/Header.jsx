import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { AuthView } from "./components/AuthView/AuthView";
import { AppBarItems } from "./components/AppBarItems/AppBarItems";

function Header() {
    return (
        <>
            <AppBar position="static" color="transparent" id="top">
                <Toolbar sx={{ display: "flex" }}>
                    <AppBarItems />
                    <AuthView />
                </Toolbar>
            </AppBar>
        </>
    );
}

export { Header };
