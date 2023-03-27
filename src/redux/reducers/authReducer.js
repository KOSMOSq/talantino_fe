const SET_TALENT_DATA = "auth/SET-TALENT-DATA";
const CLEAR_DATA = "auth/CLEAR-DATA";
const SET_TOKEN = "auth/SET-TOKEN";
const INITIALIZE = "auth/INITIALIZE";

const initialState = {
    id: null,
    name: null,
    surname: null,
    isAuth: false,
    avatar: null,
    token: null,
    isInitialized: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TALENT_DATA: 
            return {
                ...state,
                id: action.id,
                name: action.name,
                surname: action.surname,
                avatar: action.avatar,
                isAuth: true
            }
        case CLEAR_DATA:
            return {
                ...state,
                id: null,
                name: null,
                surname: null,
                avatar: null,
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
        default: 
            return state;
    }
};

export const setTalentData = (id, name, surname, avatar) => ({ type: SET_TALENT_DATA, id, name, surname, avatar });
export const clearData = () => ({ type: CLEAR_DATA });
export const initialize = () => ({ type: INITIALIZE });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export default authReducer;