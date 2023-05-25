import { Router } from "./components/Router/Router.jsx";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getAuthThunk,
    initialize,
    setToken
} from "./redux/reducers/authReducer";
import { LinearProgress } from "@mui/material";
import { PopUpMessage } from "./components/PopUpMessage/PopUpMessage.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { fontFamilyTheme } from "./shared/themes/fontFamilyTheme.js";
import { ModalConfirmation } from "./components/ModalConfirmation/ModalConfirmation.jsx";
import { closeModal } from "./redux/reducers/appReducer.js";

function App() {
    const isInitialized = useSelector(store => store.auth.isInitialized);
    const modalOpen = useSelector(store => store.app.modalOpen);
    const modalTitle = useSelector(store => store.app.modalTitle);
    const modalDescription = useSelector(store => store.app.modalDescription);
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

    if (!isInitialized) {
        return <LinearProgress />;
    }

    return (
        <ThemeProvider theme={fontFamilyTheme}>
            <BrowserRouter>
                <PopUpMessage />
                <Router />
                <ModalConfirmation title={modalTitle} description={modalDescription} open={modalOpen} infoDialog handleArgee={() => dispatch(closeModal())}/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
