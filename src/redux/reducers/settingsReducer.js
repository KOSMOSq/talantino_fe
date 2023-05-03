import { avatarAPI } from "../../api/avatarAPI";
import { sponsorAPI } from "../../api/sponsorAPI";
import { talentsAPI } from "../../api/talentsAPI";
import { setMessage } from "./appReducer";
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
            };
        default:
            return state;
    }
};

export const setIsLoading = isLoading => ({
    type: SET_IS_LOADING,
    payload: { isLoading }
});
export const setIsDone = isDone => ({ type: SET_IS_DONE, payload: { isDone } });

export const changeProfileDataThunk = data => async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const id = getState().auth.user.id;
    const token = getState().auth.token;
    data.links = [
        data.links.zero,
        data.links.one,
        data.links.two,
        data.links.three
    ];
    try {
        if (typeof data.avatar === "string") {
            await talentsAPI.changeData(id, token, data);
        } else {
            await talentsAPI.changeData(id, token, { ...data, avatar: "" });
            await avatarAPI.sendAvatar(data.avatar[0], token);
        }
        dispatch(setIsDone(true));
        dispatch(getAuthThunk());
        dispatch(
            setMessage("Your profile was successfully edited!", "success")
        );
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

export const changeSponsorDataThunk = data => async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const id = getState().auth.user.id;
    const token = getState().auth.token;

    try {
        if (typeof data.avatar === "string") {
            await sponsorAPI.changeData(id, token, data);
        } else {
            await sponsorAPI.changeData(id, token, { ...data, avatar: "" });
            await avatarAPI.sendAvatar(data.avatar[0], token);
        }
        dispatch(setIsDone(true));
        dispatch(getAuthThunk());
        dispatch(
            setMessage("Your profile was successfully edited!", "success")
        );
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

export default settingsReducer;
