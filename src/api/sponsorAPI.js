import { axiosInstance } from ".";

const sponsorAPI = {
    async deleteSponsor(id, token) {
        return (
            await axiosInstance.delete(`/sponsors/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        ).data;
    }
};

export { sponsorAPI };
