import { axiosInstance } from ".";

const talentsAPI = {
    async getTalents(amount, page) {
        return (
            await axiosInstance.get(`/talents?amount=${amount}&page=${page}`)
        ).data;
    },

    async getTalent(id) {
        return (await axiosInstance.get(`/talents/${id}`)).data;
    },
};

export { talentsAPI };
