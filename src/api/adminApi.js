import { axiosInstance } from ".";

const adminApi = {
    async getTalents(token, page, email = "") {
        return (
            await axiosInstance.get(
                `/admin/talents?page=${page}&size=10${
                    email ? `&email=${email}` : ""
                }`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    },
    async deleteTalent(token, id) {
        return (
            await axiosInstance.delete(`/admin/talents/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async getProofs(token, page, title = "") {
        return (
            await axiosInstance.get(
                `/admin/proofs?page=${page}&size=10${
                    title ? `&title=${title}` : ""
                }`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    },
    async deleteProof(token, id) {
        return (
            await axiosInstance.delete(`/admin/proofs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async editKind(token, id, title) {
        return await axiosInstance.patch(`/admin/talents/kinds/${id}`, title, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain"
            }
        });
    }
};

export { adminApi };
