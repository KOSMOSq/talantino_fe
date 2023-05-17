import { skillsAPI } from "../../api/skillsAPI";
import { setMessage } from "./appReducer";

const SET_SKILLS = "skills/SET-SKILLS";
const SET_FILTER_SKILLS = "skills/SET-FILTER-SKILLS";

const initialState = {
    skills: [],
    filterSkills: []
};

const skillsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SKILLS:
            return {
                ...state,
                skills: action.skills
            };
        case SET_FILTER_SKILLS:
            return {
                ...state,
                filterSkills: action.filterSkills
            };
        default:
            return state;
    }
};

const setSkills = skills => ({ type: SET_SKILLS, skills });
export const setFilterSkills = filterSkills => ({
    type: SET_FILTER_SKILLS,
    filterSkills
});

export const getSkillsThunk = () => async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
        const response = await skillsAPI.getSkills(token);
        dispatch(setSkills(response.skills));
    } catch (err) {
        dispatch(
            setMessage(
                err.response?.data.message
                    ? err.response.data.message
                    : "Failed to load skills, try again later.",
                "error"
            )
        );
    } finally {
    }
};

export default skillsReducer;
