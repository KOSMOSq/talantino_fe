import { axiosInstance } from ".";

const avatarAPI = {
    async sendAvatar(avatar, token) {
        const formData = new FormData();
        formData.append("file", avatar);

        return (
            await axiosInstance.post("/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                    Authorization: `Bearer ${token}`
                }
            })
        ).data;
    }
};

export { avatarAPI };
