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
    }
};

export { kudosAPI };
