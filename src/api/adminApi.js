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
    }
};

export { adminApi };
