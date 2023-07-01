const SET_MESSAGE = "app/SET-MESSAGE";
const CLEAR_MESSAGE = "app/CLEAR-MESSAGE";
const OPEN_MODAL = "app/OPEN-MODAL";
const CLOSE_MODAL = "app/CLOSE-MODAL";

type InitialStateType = {
    isMessage: boolean;
    messageText: string;
    status: string;
    onClick: (() => void) | null;
    modalOpen: boolean;
    modalTitle: string;
    modalDescription: string;
};

const initialState: InitialStateType = {
    isMessage: false,
    messageText: "",
    status: "error",
    onClick: null,
    modalOpen: false,
    modalTitle: "",
    modalDescription: ""
};

type ActionType =
    | SetMessageActionType
    | ClearMessageActionType
    | OpenModalActionType
    | CloseModalActionType;

const appReducer = (
    state = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                isMessage: true,
                messageText: action.text,
                status: action.status,
                onClick: action.onClick
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

type SetMessageActionType = {
    type: typeof SET_MESSAGE;
    text: string;
    status: string;
    onClick: (() => void) | null;
};

type ClearMessageActionType = {
    type: typeof CLEAR_MESSAGE;
};

export type OpenModalActionType = {
    type: typeof OPEN_MODAL;
    title: string;
    description: string;
};

type CloseModalActionType = {
    type: typeof CLOSE_MODAL;
};

export const setMessage = (
    text: string,
    status: string,
    onClick: (() => void) | null = null
): SetMessageActionType => ({
    type: SET_MESSAGE,
    text,
    status,
    onClick
});

export const clearMessage = (): ClearMessageActionType => ({
    type: CLEAR_MESSAGE
});

export const openModal = (
    title: string,
    description: string
): OpenModalActionType => ({
    type: OPEN_MODAL,
    title,
    description
});

export const closeModal = (): CloseModalActionType => ({ type: CLOSE_MODAL });

export default appReducer;
