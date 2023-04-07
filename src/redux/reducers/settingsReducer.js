import { talentsAPI } from "../../api/talentsAPI";
import { setGlobalError } from "./appReducer";
import { getAuthThunk } from "./authReducer";

const SET_IS_LOADING = "settings/SET-IS-LOADING";
const SET_IS_DONE = "settings/SET_IS_DONE";

const initialState = {
    isLoading: false,
    isDone: false
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
        case SET_IS_DONE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export const setIsLoading = isLoading => ({ type: SET_IS_LOADING, payload: { isLoading } });
export const setIsDone = isDone => ({ type: SET_IS_DONE, payload: { isDone } });

export const changeProfileDataThunk = data => async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const id = getState().auth.id;
    const token = getState().auth.token;
    data.links = [
        data.links.zero,
        data.links.one,
        data.links.two,
        data.links.three,
    ];
    try {
        await talentsAPI.changeData(id, token, data);
        dispatch(setIsDone(true));
        dispatch(getAuthThunk());
    } catch (err) {
        dispatch(setGlobalError(err.response?.data.message ? err.response.data.message : "Unknown error"));
    } finally {
        dispatch(setIsLoading(false));
    }
};

export default settingsReducer;