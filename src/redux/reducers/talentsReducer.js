const SET_CURRENT_PAGE = 'talents/SET-CURRENT-PAGE';
const SET_TOTAL_PAGES = 'talents/SET-TOTAL-PAGES';
const SET_TALENTS = 'talents/SET-TALENTS';
const SET_CLICKED_ID = 'talents/SET-CLICKED-ID';
const SET_TALENTS_VIEW = 'talents/SET-TALENTS-VIEW';

const initialState = {
    currentPage: 1,
    totalPages: 1,
    talents: {},
    clickedId: null,
    talentsView: "grid",
}

const talentsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.amount
            }
        case SET_TALENTS:
            return {
                ...state,
                talents: action.talents
            }
        case SET_CLICKED_ID:
            return {
                ...state,
                clickedId: action.clickedId
            }
        case SET_TALENTS_VIEW:
            return {
                ...state,
                talentsView: action.talentsView
            }
        default:
            return state;
    }
}

export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setTotalPages = (amount) => ({type: SET_TOTAL_PAGES, amount});
export const setTalents = (talents) => ({type: SET_TALENTS, talents});
export const setClikedId= (clickedId) => ({type: SET_CLICKED_ID, clickedId});
export const setTalentsView= (talentsView) => ({type: SET_TALENTS_VIEW, talentsView});

export default talentsReducer;