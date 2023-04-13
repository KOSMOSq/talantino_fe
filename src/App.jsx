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

function App() {
    const isInitialized = useSelector(store => store.auth.isInitialized);
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
        <BrowserRouter>
            <PopUpMessage />
            <Router />
        </BrowserRouter>
    );
}

export default App;
