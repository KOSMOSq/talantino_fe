import { axiosInstance } from ".";

const talentsAPI = {
    async getTalents(amount, page, skills) {
        return (
            await axiosInstance.get(
                `/talents?amount=${amount}&page=${page}${
                    skills ? `&skills=${skills}` : ""
                }`
            )
        ).data;
    },
    async getTalent(id, token) {
        return (
            await axiosInstance.get(`/talents/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async changeData(id, token, data) {
        return (
            await axiosInstance.patch(`/talents/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async deleteTalent(id, token) {
        return (
            await axiosInstance.delete(`/talents/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async getStats(talentId, token) {
        return (
            await axiosInstance.get(`/talents/${talentId}/statistic`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async getKinds(token, page) {
        return (
            await axiosInstance.get(`/talents/kinds?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async reportTalent(token, id) {
        return (
            await axiosInstance.post(
                `/talents/${id}/report`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        ).data;
    }
};

export { talentsAPI };
