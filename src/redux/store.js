import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import talentsReducer from "./reducers/talentsReducer";
import settingsReducer from "./reducers/settingsReducer";
import talentsProofsReducer from "./reducers/talentsProofsReducer";
import proofsReducer from "./reducers/proofsReducer";
import skillsReducer from "./reducers/skillsReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        talents: talentsReducer,
        app: appReducer,
        settings: settingsReducer,
        talentProofs: talentsProofsReducer,
        proofs: proofsReducer,
        skills: skillsReducer
    }
});

export { store };
