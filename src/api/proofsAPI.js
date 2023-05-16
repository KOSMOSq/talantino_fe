import { axiosInstance } from ".";

const proofsAPI = {
    async getTalentProofs(
        token,
        id,
        sort = "date",
        status = "PUBLISHED",
        type = "asc",
        page = 0,
        amount = 9
    ) {
        return (
            await axiosInstance.get(
                `/talents/${id}/proofs?sort=${sort}&status=${status}&type=${type}&page=${page}&amount=${amount}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    },

    async addProof(id, token, data) {
        return (
            await axiosInstance.post(`/talents/${id}/proofs`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },

    async deleteProof(id, proofId, token) {
        return (
            await axiosInstance.delete(`/talents/${id}/proofs/${proofId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },

    async getProofs(sort = "date", type = "desc", page, count = 9, token) {
        const authorization = token === null ? null : `Bearer ${token}`;
        return (
            await axiosInstance.get(
                `/proofs?sort=${sort}&type=${type}&page=${page}&count=${count}`,
                {
                    headers: { Authorization: authorization }
                }
            )
        ).data;
    },

    async editProof(talentId, proofId, data, token) {
        return (
            await axiosInstance.patch(
                `/talents/${talentId}/proofs/${proofId}`,
                data,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    },
    async reportProof(proofId, token) {
        return (
            await axiosInstance.post(
                `/proofs/${proofId}/report`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    }
};

export { proofsAPI };
