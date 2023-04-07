import { axiosInstance } from ".";

const proofsAPI = {
    async getTalentProofs(token, id, sort = "date", status = "PUBLISHED", type = "asc", page = 0, amount = 9) {
        return (await axiosInstance.get(`/talents/${id}/proofs?sort=${sort}&status=${status}&type=${type}&page=${page}&amount=${amount}`, {
            headers: { Authorization: `Bearer ${token}` },
        })).data;
    },
    async addProof(id, token, data) {
        return (await axiosInstance.post(`/talents/${id}/proofs`, data, {
            headers: { Authorization: `Bearer ${token}` }
        })).data;
    }
}

export { proofsAPI };