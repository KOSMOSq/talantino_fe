import { axiosInstance } from ".";

export const notificationsAPI = {
    async getNotifications(page, size, token) {
        return (await axiosInstance.get(`/notifications?page=${page}&size=${size}`, {
            headers: { Authorization: `Bearer ${token}` }
        })).data;
    },
    async readNotification(id, token) {
        return (await axiosInstance.patch(`/notifications/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })).data;
    }
};
