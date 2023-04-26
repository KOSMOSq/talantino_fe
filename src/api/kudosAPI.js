import { axiosInstance } from ".";

const kudosAPI = {
    async sendKudos(id, token) {
        return (
            await axiosInstance.post(
                `/proofs/${id}/kudos`,
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
    async getSponsorsOfProof(id, token) {
        return (
            await axiosInstance.get(
                `/proofs/${id}/kudos`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    }
};

export { kudosAPI };
