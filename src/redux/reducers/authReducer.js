const SET_TALENT_DATA = "auth/SET-TALENT-DATA";
const CLEAR_DATA = "auth/CLEAR-DATA";
const SET_TOKEN = "auth/SET-TOKEN";
const INITIALIZE = "auth/INITIALIZE";

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
    isInitialized: false
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
        default:
            return state;
    }
};

export const setTalentData = ({ id, name, surname, email, kind, description, avatar, experience, location, links }) => ({ type: SET_TALENT_DATA, id, name, surname, email, kind, description, avatar, experience, location, links });
export const clearData = () => ({ type: CLEAR_DATA });
export const initialize = () => ({ type: INITIALIZE });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export default authReducer;