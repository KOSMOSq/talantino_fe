import { axiosInstance } from ".";

export const skillsAPI = {
    async getSkills(token) {
        return (
            await axiosInstance.get(`/skill`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async deleteSkillFromProof(talentId, proofId, skillId, token) {
        return (
            await axiosInstance.delete(
                `/talents/${talentId}/proofs/${proofId}/skills/${skillId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    }
};
