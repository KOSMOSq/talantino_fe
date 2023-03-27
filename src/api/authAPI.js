import { axiosInstance } from ".";

const authAPI = {
	async register(data) {
		return (
			await axiosInstance.post(`/talents/register`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
		).data;
	},
	async login(data) {
		return (
			await axiosInstance.post(`/talents/login`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
		).data;
	},
};

export { authAPI };
