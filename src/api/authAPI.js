import { axiosInstance } from ".";
import { Buffer } from "buffer";

const authAPI = {
    async register(data, endpoint) {
        return (await axiosInstance.post(`/${endpoint}/register`, data)).data;
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
                        Authorization: `Basic ${base64encodedData}`
                    }
                }
            )
        ).data;
    },
    async auth(token) {
        return (
            await axiosInstance.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ).data;
    }
};

export { authAPI };
