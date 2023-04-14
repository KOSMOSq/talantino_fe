const SET_MESSAGE = "app/SET-MESSAGE";
const CLEAR_MESSAGE = "app/CLEAR-MESSAGE";

const initialState = {
    isMessage: false,
    messageText: "",
    status: ""
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                isMessage: true,
                messageText: action.text,
                status: action.status
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                isMessage: false,
                messageText: "",
                status: ""
            };
        default:
            return state;
    }
};

export const setMessage = (text, status) => ({
    type: SET_MESSAGE,
    text,
    status
});
export const clearMessage = () => ({ type: CLEAR_MESSAGE });

export default appReducer;
