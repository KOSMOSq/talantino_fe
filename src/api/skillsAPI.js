import { axiosInstance } from ".";

export const skillsAPI = {
    async getSkills(token) {
        return (
            await axiosInstance.get(`/skill`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    }
};
