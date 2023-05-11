import { axiosInstance } from ".";

export const skillsAPI = {
    async getSkills(token) {
        return (await axiosInstance.get(`/skills`, {})).data;
    }
};
