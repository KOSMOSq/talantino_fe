import { axiosInstance } from ".";

export const sponsorAPI = {
    async getSponsor(id, token) {
        return (
            await axiosInstance.get(`/sponsors/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async changeData(id, token, data) {
        return (
            await axiosInstance.patch(`/sponsors/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    },
    async deleteSponsor(id, token) {
        return (
            await axiosInstance.delete(`/sponsors/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    }
};

export { sponsorAPI };