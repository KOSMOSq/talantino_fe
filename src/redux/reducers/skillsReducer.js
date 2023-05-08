import { skillsAPI } from "../../api/skillsAPI";
import { setMessage } from "./appReducer";

const SET_SKILLS = "skills/SET-SKILLS";

const initialState = {
    skills: []
};

const skillsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SKILLS:
            return {
                ...state,
                skills: action.skills
            }
        default:
            return state;
    }
};

const setSkills = skills => ({ type: SET_SKILLS, skills });

export const getSkillsThunk = () => async dispatch => {
    try {
        const response = await skillsAPI.getSkills();
        dispatch(setSkills(response));
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