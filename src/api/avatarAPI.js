import { axiosInstance } from ".";

const avatarAPI = {
    async sendAvatar(avatar, token) {
        const formData = new FormData();
        formData.append("file", avatar);

        return (
            await axiosInstance.post("/s3/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                    Authorization: `Bearer ${token}`
                }
            })
        ).data;
    },
    async deleteAvatar(token) {
        return (
            await axiosInstance.delete("/s3/delete", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ).data;
    }
};

export { avatarAPI };
