import { Router } from "./components/Router/Router.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getAuthThunk,
    initialize,
    setToken
} from "./redux/reducers/authReducer";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import { clearGlobalError } from "./redux/reducers/appReducer";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

function App() {
    const isInitialized = useSelector(store => store.auth.isInitialized);
    const globalError = useSelector(store => store.app.globalError);
    const globalErrorMessage = useSelector(
        store => store.app.globalErrorMessage
    );
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            token &&
            JSON.parse(atob(token.split(".")[1])).exp >
                Math.floor(Date.now() / 1000)
        ) {
            dispatch(setToken(token));
            dispatch(getAuthThunk());
        } else {
            dispatch(initialize());
        }
    }, []);

    const handleClose = (e, reason) => {
        dispatch(clearGlobalError());
    };

    if (!isInitialized) {
        return <LinearProgress />;
    }

    const THEME = createTheme({
        typography: {
            allVariants: {
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                fontWeightLight: 300,
                fontWeightRegular: 400,
                fontWeightMedium: 500
            }
        }
    });
    return (
        <ThemeProvider theme={THEME}>
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
        </ThemeProvider>
    );
}

export default App;
