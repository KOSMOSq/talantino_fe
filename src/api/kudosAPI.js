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
    }
};

export { kudosAPI };
