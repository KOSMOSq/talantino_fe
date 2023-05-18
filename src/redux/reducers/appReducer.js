const SET_MESSAGE = "app/SET-MESSAGE";
const CLEAR_MESSAGE = "app/CLEAR-MESSAGE";
const OPEN_MODAL = "app/OPEN-MODAL";
const CLOSE_MODAL = "app/CLOSE-MODAL";

const initialState = {
    isMessage: false,
    messageText: "",
    status: "error",
    modalOpen: false,
    modalTitle: "",
    modalDescription: ""
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
                isMessage: false
            };
        case OPEN_MODAL:
            return {
                ...state,
                modalOpen: true,
                modalTitle: action.title,
                modalDescription: action.description
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modalOpen: false,
                modalTitle: "",
                modalDescription: ""
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
export const openModal = (title, description) => ({ type: OPEN_MODAL, title, description });
export const closeModal = () => ({ type: CLOSE_MODAL });

export default appReducer;
