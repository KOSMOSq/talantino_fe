import { axiosInstance } from ".";

export const skillsAPI = {
    async getSkills() {
        return (await axiosInstance.get(`/skills`)).data;
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
