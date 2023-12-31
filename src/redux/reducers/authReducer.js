import { authAPI } from "../../api/authAPI";
import { openModal, setMessage } from "./appReducer";
import { setClikedId } from "./talentsReducer";

const SET_USER_DATA = "auth/SET-USER-DATA";
const CLEAR_DATA = "auth/CLEAR-DATA";
const SET_TOKEN = "auth/SET-TOKEN";
const INITIALIZE = "auth/INITIALIZE";
const SET_IS_LOADING = "auth/SET_IS_LOADING";
const SET_IS_OPEN_EMAIL_MODAL = "auth/SET_IS_OPEN_EMAIL_MODAL";
const SET_LOGOUT_TIMEOUT_ID = "auth/SET-LOGOUT-TIMEOUT-ID";

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
        role: null,
        links: []
    },
    isAuth: false,
    token: null,
    isInitialized: false,
    isLoading: false,
    isOpenEmailModal: false,
    logoutTimeoutId: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.user,
                isAuth: true
            };
        case CLEAR_DATA:
            return {
                ...initialState,
                isInitialized: true
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
        case SET_IS_OPEN_EMAIL_MODAL:
            return {
                ...state,
                isOpenEmailModal: action.isOpen
            };
        case SET_LOGOUT_TIMEOUT_ID:
            return {
                ...state,
                logoutTimeoutId: action.id
            };
        default:
            return state;
    }
};

export const setUserData = user => ({ type: SET_USER_DATA, user });
export const clearData = () => ({ type: CLEAR_DATA });
export const initialize = () => ({ type: INITIALIZE });
export const setToken = token => ({ type: SET_TOKEN, token });
export const setIsLoading = isLoading => ({ type: SET_IS_LOADING, isLoading });
export const setLogoutTimeoutId = id => ({ type: SET_LOGOUT_TIMEOUT_ID, id });
export const setIsOpenEmailModal = isOpen => ({
    type: SET_IS_OPEN_EMAIL_MODAL,
    isOpen
});

export const getAuthThunk = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    const isInitialized = getState().auth.isInitialized;
    const logoutTimeoutId = getState().auth.logoutTimeoutId;

    try {
        const response = await authAPI.auth(token);
        if (!logoutTimeoutId) {
            const time =
                (JSON.parse(atob(token.split(".")[1])).exp -
                    Math.floor(Date.now() / 1000)) *
                1000;

            dispatch(
                setLogoutTimeoutId(
                    setTimeout(() => {
                        dispatch(
                            openModal(
                                "Your session has expiered!",
                                "You need to re-login."
                            )
                        );
                        localStorage.removeItem("token");
                    }, time)
                )
            );
        }
        dispatch(setUserData(response));
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

export const registerThunk = (data, role) => async dispatch => {
    try {
        dispatch(setIsLoading(true));
        if (role === "TALENT") {
            await authAPI.register(
                {
                    email: data.email,
                    password: data.password,
                    name: data.fName,
                    surname: data.lName,
                    kind: data.kindOfTalent
                },
                "talents"
            );
        } else if (role === "SPONSOR") {
            await authAPI.register(
                {
                    email: data.email,
                    password: data.password,
                    name: data.fName,
                    surname: data.lName
                },
                "sponsor"
            );
        } else {
            console.log("Wrong usage of register thunk!");
            throw new Error("Error!");
        }
        dispatch(setIsOpenEmailModal(true));
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

export const clearDataThunk = () => (dispatch, getState) => {
    const logoutTimeoutId = getState().auth.logoutTimeoutId;
    clearTimeout(logoutTimeoutId);
    dispatch(clearData());
    dispatch(setClikedId(null));
    localStorage.clear();
};

export default authReducer;
