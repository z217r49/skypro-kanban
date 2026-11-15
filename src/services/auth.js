import { api, getErrorMessage } from "./api";

export const getUsers = async () => {
    try {
        const { data } = await api.get("/user");
        return data.users ?? [];
    } catch (error) {
        throw new Error(getErrorMessage(error, "Не удалось загрузить пользователей"), {
            cause: error,
        });
    }
};

export const login = async ({ login, password }) => {
    try {
        const { data } = await api.post(
            "/user/login",
            JSON.stringify({ login, password })
        );
        return data.user;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Неверный логин или пароль"), {
            cause: error,
        });
    }
};

export const register = async ({ login, name, password }) => {
    try {
        const { data } = await api.post(
            "/user",
            JSON.stringify({ login, name, password })
        );
        return data.user;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Не удалось зарегистрироваться"), {
            cause: error,
        });
    }
};