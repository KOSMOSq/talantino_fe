import { proofsAPI } from "../../api/proofsAPI";

const SET_PROOFS_SORT_TYPE = "proofs/SET-PROOFS-SORT-TYPE";
const SET_PROOFS = "proofs/SET-PROOFS";
const SET_TOTAL_PAGES = "proofs/SET-TOTAL-PAGES";
const SET_CURRENT_PAGE = "proofs/SET-CURRENT-PAGE";
const SET_IS_LOADING = "proofs/SET-IS-LOADING";

const initialState = {
    proofs: [],
    totalPages: null,
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
    (page, count, sortType, navigate) => async dispatch => {
        try {
            const response = await proofsAPI.getProofs(
                undefined,
                sortType,
                page - 1,
                count
            );
            const total = Math.ceil(response.totalAmount / count);
            dispatch(setTotalPages(total));

            if (page > total) {
                dispatch(setPage(total));
                navigate(`/proofs?page=${total}`);
                return;
            }

            dispatch(setProofs(response.proofs));
            dispatch(setIsLoading(false));
        } catch (err) {
            console.log(err);
        }
    };

export default proofsReducer;
