import { axiosInstance } from ".";
import { Buffer } from "buffer";
import { RegisterEndpoints } from "./types/endpoints";
import { ConfirmResponse, LoginData, RegisterData } from "./types/authData";
import { AuthMeData, LoggedUserData } from "./types/models";

const authAPI = {
    async register(
        data: RegisterData,
        endpoint: RegisterEndpoints
    ): Promise<void> {
        await axiosInstance.post<RegisterData>(`/${endpoint}/register`, data);
    },
    async login({ email, password }: LoginData): Promise<LoggedUserData> {
        const base64encodedData = Buffer.from(`${email}:${password}`).toString(
            "base64"
        );
        return (
            await axiosInstance.post<LoggedUserData>(
                `/login`,
                {},
                {
                    headers: {
                        Authorization: `Basic ${base64encodedData}`
                    }
                }
            )
        ).data;
    },
    async auth(token: string): Promise<AuthMeData> {
        return (
            await axiosInstance.get<AuthMeData>("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ).data;
    },
    async emailConfirm(token: string): Promise<string> {
        return (
            await axiosInstance.post<ConfirmResponse>(
                `/email-confirm?token=${token}`,
                {}
            )
        ).data.token;
    },
    async recoverAccount(token: string): Promise<void> {
        await axiosInstance.post(`/account-recover?token=${token}`, {});
    }
};

export { authAPI };
