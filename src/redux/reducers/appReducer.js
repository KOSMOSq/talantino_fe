const SET_GLOBAL_ERROR = "app/SET-GLOBAL-ERROR";
const CLEAR_GLOBAL_ERROR = "app/CLEAR-GLOBAL-ERROR";

const initialState = {
    globalError: false,
    globalErrorMessage: ""
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalErrorMessage: action.message,
                globalError: true
            };
        case CLEAR_GLOBAL_ERROR:
            return {
                ...state,
                globalErrorMessage: "",
                globalError: false
            };
        default:
            return state;
    }
};

export const setGlobalError = message => ({ type: SET_GLOBAL_ERROR, message });
export const clearGlobalError = () => ({ type: CLEAR_GLOBAL_ERROR });

export default appReducer;
