import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import talentsReducer from "./reducers/talentsReducer";
import settingsReducer from "./reducers/settingsReducer";
import talentsProofsReducer from "./reducers/talentsProofsReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        talents: talentsReducer,
        app: appReducer,
        settings: settingsReducer,
        talentProofs: talentsProofsReducer
    }
});

export { store };
