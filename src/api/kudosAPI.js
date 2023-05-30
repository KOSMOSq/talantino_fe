import { axiosInstance } from ".";

const kudosAPI = {
    async sendKudos(id, token, amount) {
        return (
            await axiosInstance.post(
                `/proofs/${id}/kudos?amount=${amount}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    },
    async addKudos(token, amount) {
        return (
            await axiosInstance.post(
                `/sponsors/balance`,
                { amount },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    },
    async getSponsorsOfProof(id, token, page) {
        return (
            await axiosInstance.get(`/proofs/${id}/kudos?page=${page}&size=5`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async sendKudosToSkill(proofId, skillId, amount, token) {
        return (
            await axiosInstance.post(
                `/proofs/${proofId}/skills/${skillId}/kudos?amount=${amount}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    }
};

export { kudosAPI };
