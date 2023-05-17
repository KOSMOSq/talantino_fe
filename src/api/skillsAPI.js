import { axiosInstance } from ".";

export const skillsAPI = {
    async getSkills() {
        return (await axiosInstance.get(`/skills`, {})).data;
    }
};
