import { axiosInstance } from ".";

const authAPI = {
    async register(data) {
        return (await axiosInstance.post(`/talents/register`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })).data;
    }
};

export { authAPI };