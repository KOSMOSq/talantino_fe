import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import talentsReducer from "./reducers/talentsReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        talents: talentsReducer,
    }
});

export { store };