import { authAPI } from "../../api/authAPI";
import { setMessage } from "./appReducer";

const SET_TALENT_DATA = "auth/SET-TALENT-DATA";
const CLEAR_DATA = "auth/CLEAR-DATA";
const SET_TOKEN = "auth/SET-TOKEN";
const INITIALIZE = "auth/INITIALIZE";
const SET_IS_LOADING = "auth/SET_IS_LOADING";

const initialState = {
    user: {
        id: null,
        name: null,
        surname: null,
        email: null,
        kind: null,
        description: null,
        avatar: null,
        experience: null,
        location: null,
        links: []
    },
    isAuth: false,
    token: null,
    isInitialized: false,
    isLoading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TALENT_DATA:
            return {
                ...state,
                user: action.user,
                isAuth: true
            };
        case CLEAR_DATA:
            return {
                ...state,
                user: initialState.user,
                isAuth: false,
                token: null
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case INITIALIZE:
            return {
                ...state,
                isInitialized: true
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};

export const setTalentData = user => ({ type: SET_TALENT_DATA, user });
export const clearData = () => ({ type: CLEAR_DATA });
export const initialize = () => ({ type: INITIALIZE });
export const setToken = token => ({ type: SET_TOKEN, token });
export const setIsLoading = isLoading => ({ type: SET_IS_LOADING, isLoading });

export const getAuthThunk = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    const isInitialized = getState().auth.isInitialized;

    try {
        const response = await authAPI.auth(token);
        dispatch(setTalentData(response));
        if (!isInitialized) {
            dispatch(initialize());
        }
    } catch (err) {
        dispatch(
            setMessage(
                err.response?.data.message
                    ? err.response.data.message
                    : "Network error",
                "error"
            )
        );
    } finally {
        dispatch(initialize());
    }
};

export const loginThunk = data => async dispatch => {
    try {
        dispatch(setIsLoading(true));
        const response = await authAPI.login({
            email: data.email,
            password: data.password
        });
        localStorage.setItem("token", response.token);
        dispatch(setToken(response.token));
        dispatch(getAuthThunk());
    } catch (err) {
        dispatch(
            setMessage(
                err.response?.data.message
                    ? "Invalid email or password"
                    : "Network error",
                "error"
            )
        );
    } finally {
        dispatch(setIsLoading(false));
    }
};

export const registerThunk = data => async dispatch => {
    try {
        dispatch(setIsLoading(true));
        await authAPI.register({
            email: data.email,
            password: data.password,
            name: data.fName,
            surname: data.lName,
            kind: data.kindOfTalent
        });
        dispatch(loginThunk(data));
    } catch (err) {
        dispatch(
            setMessage(
                err.response?.data.message
                    ? err.response.data.message
                    : "Network error",
                "error"
            )
        );
    } finally {
        dispatch(setIsLoading(false));
    }
};

export default authReducer;
