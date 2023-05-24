import { proofsAPI } from "../../api/proofsAPI";
import { setMessage } from "./appReducer";

const SET_PROOFS_SORT_TYPE = "proofs/SET-PROOFS-SORT-TYPE";
const SET_PROOFS = "proofs/SET-PROOFS";
const SET_TOTAL_PAGES = "proofs/SET-TOTAL-PAGES";
const SET_CURRENT_PAGE = "proofs/SET-CURRENT-PAGE";
const SET_IS_LOADING = "proofs/SET-IS-LOADING";

const initialState = {
    proofs: [],
    totalPages: 1,
    currentPage: 1,
    proofsSortType: "desc",
    isLoading: true
};

const proofsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROOFS:
        case SET_TOTAL_PAGES:
        case SET_CURRENT_PAGE:
        case SET_PROOFS_SORT_TYPE:
        case SET_IS_LOADING:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};

export const setProofsSortType = proofsSortType => ({
    type: SET_PROOFS_SORT_TYPE,
    payload: { proofsSortType }
});

export const setProofs = proofs => ({
    type: SET_PROOFS,
    payload: { proofs }
});

export const setTotalPages = totalPages => ({
    type: SET_TOTAL_PAGES,
    payload: { totalPages }
});

export const setPage = currentPage => ({
    type: SET_CURRENT_PAGE,
    payload: { currentPage }
});

export const setIsLoading = bool => ({
    type: SET_IS_LOADING,
    payload: { isLoading: bool }
});

export const getProofsThunk =
    (page, count, sortType, navigate) => async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await proofsAPI.getProofs(
                undefined,
                sortType,
                page - 1,
                count,
                token
            );
            const total = Math.ceil(response.totalAmount / count);

            if (page > total && total > 0) {
                navigate(`/proofs?page=${total}`);
                return;
            } else if (total === 0) {
                dispatch(setMessage("No proofs here (", "error"));
            }

            if (total) {
                dispatch(setTotalPages(total));
            }
            dispatch(setProofs(response.proofs));
            dispatch(setIsLoading(false));
        } catch (err) {
            dispatch(
                setMessage(
                    err.response?.data.message
                        ? err.response.data.message
                        : "Network error",
                    "error"
                )
            );
        }
    };

export const sendReportThunk = id => async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
        await proofsAPI.reportProof(id, token);
        dispatch(setMessage("Your report sent successfully!", "success"));
    } catch (err) {
        dispatch(
            setMessage(
                err.response?.data.message
                    ? err.response.data.message
                    : "You need to log in to send a report.",
                "error"
            )
        );
    }
};

export default proofsReducer;
