import { axiosInstance } from ".";

const talentsAPI = {
    async getTalents(amount, page) {
        return (
            await axiosInstance.get(`/talents?amount=${amount}&page=${page}`)
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
        return (await axiosInstance.patch(`/talents/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        })).data;
    }
};

export { talentsAPI };
