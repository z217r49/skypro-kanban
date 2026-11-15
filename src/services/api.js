import axios from "axios";
import { clearAuth, getToken } from "./storage";

export const API_URL = "https://wedev-api.sky.pro/api";

export const api = axios.create({
    baseURL: API_URL,
});

const setHeader = (headers, name, value) => {
    if (typeof headers.set === "function") {
        headers.set(name, value);
    } else {
        headers[name] = value;
    }
};

api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        setHeader(config.headers, "Authorization", `Bearer ${token}`);
    }

    if (config.data !== undefined && config.data !== null) {

        if (typeof config.data !== "string") {
            config.data = JSON.stringify(config.data);
        }

        setHeader(config.headers, "Content-Type", "text/plain");
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAuth();
            window.dispatchEvent(new Event("kanban:unauthorized"));
        }

        return Promise.reject(error);
    }
);

export const getErrorMessage = (error, fallback = "Не удалось выполнить запрос") => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data === "string" && data.trim()) {
            return data;
        }

        if (data && typeof data === "object") {
            const message = data.error ?? data.message ?? data.errors?.[0]?.message;

            if (typeof message === "string" && message.trim()) {
                return message;
            }
        }

        if (!error.response) {
            return "Нет соединения с сервером. Проверьте подключение к интернету.";
        }

        if (error.response.status === 401) {
            return "Требуется авторизация";
        }

        if (error.response.status === 404) {
            return "Запись не найдена";
        }

        return `${fallback} (код ${error.response.status})`;
    }

    return error?.message || fallback;
};