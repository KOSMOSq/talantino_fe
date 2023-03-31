import { axiosInstance } from ".";
import { Buffer } from "buffer";

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
	async login({ email, password }) {
		const base64encodedData = Buffer.from(`${email}:${password}`).toString(
			"base64"
		);
		return (
			await axiosInstance.post(
				`/talents/login`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Basic ${base64encodedData}`,
					},
				}
			)
		).data;
	},
	async auth(token) {
		return (await axiosInstance.get("/api/auth", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})).data;
	}
};

export { authAPI };
