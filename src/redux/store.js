import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import talentsReducer from "./reducers/talentsReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        talents: talentsReducer,
        app: appReducer
    }
});

export { store };