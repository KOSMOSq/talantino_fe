import { authAPI } from "../../api/authAPI";
import { setGlobalError } from "./appReducer";

const SET_TALENT_DATA = "auth/SET-TALENT-DATA";
const CLEAR_DATA = "auth/CLEAR-DATA";
const SET_TOKEN = "auth/SET-TOKEN";
const INITIALIZE = "auth/INITIALIZE";
const SET_IS_LOADING = "auth/SET_IS_LOADING";

const initialState = {
    id: null,
    name: null,
    surname: null,
    email: null,
    kind: null,
    description: null,
    avatar: null,
    experience: null,
    location: null,
    links: [],
    isAuth: false,
    token: null,
    isInitialized: false,
    isLoading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TALENT_DATA:
            return {
                ...state,
                id: action.id,
                name: action.name,
                surname: action.surname,
                email: action.email,
                kind: action.kind,
                description: action.description,
                avatar: action.avatar,
                experience: action.experience,
                location: action.location,
                links: action.links,
                isAuth: true,
            }
        case CLEAR_DATA:
            return {
                ...state,
                id: null,
                name: null,
                surname: null,
                email: null,
                kind: null,
                description: null,
                avatar: null,
                experience: null,
                location: null,
                links: [],
                isAuth: false,
                token: null
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case INITIALIZE:
            return {
                ...state,
                isInitialized: true
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
};

export const setTalentData = ({ id, name, surname, email, kind, description, avatar, experience, location, links }) => ({ type: SET_TALENT_DATA, id, name, surname, email, kind, description, avatar, experience, location, links });
export const clearData = () => ({ type: CLEAR_DATA });
export const initialize = () => ({ type: INITIALIZE });
export const setToken = (token) => ({ type: SET_TOKEN, token });
export const setIsLoading = isLoading => ({ type: SET_IS_LOADING, isLoading });

export const getAuthThunk = (token) => async dispatch => {
    try {
        const response = await authAPI.auth(token);
        dispatch(setTalentData(response));
        dispatch(initialize());
    } catch (err) {
        console.log(err);
        dispatch(initialize());
    }
};

export const loginThunk = (data) => async dispatch => {
    try {
        dispatch(setIsLoading(true));
        const response = await authAPI.login({
            email: data.email,
            password: data.password,
        });
        localStorage.setItem("token", response.token);
        dispatch(setToken(response.token));
        dispatch(getAuthThunk(response.token));
    } catch (err) {
        dispatch(setGlobalError("Wrong email or password"));
    }
    dispatch(setIsLoading(false));
};

export const registerThunk = (data) => async dispatch => {
    dispatch(setIsLoading(true));
    await authAPI.register({
        email: data.email,
        password: data.password,
        name: data.fName,
        surname: data.lName,
        kind: data.kindOfTalent,
    });
    dispatch(loginThunk(data));
};

export default authReducer;