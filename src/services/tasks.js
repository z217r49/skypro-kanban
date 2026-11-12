import { api, getErrorMessage } from "./api";

export const getTasks = async () => {
    try {
        const { data } = await api.get("/kanban");
        return data.tasks ?? [];
    } catch (error) {
        throw new Error(getErrorMessage(error, "Не удалось загрузить задачи"), {
            cause: error,
        });
    }
};

export const getTaskById = async (id) => {
    try {
        const { data } = await api.get(`/kanban/${id}`);
        return data.task;
    } catch (error) {
        throw new Error(getErrorMessage(error, "Не удалось загрузить задачу"), {
            cause: error,
        });
    }
};

export const createTask = async (task) => {
    try {
        const { data } = await api.post("/kanban", JSON.stringify(task));
        return data.tasks ?? [];
    } catch (error) {
        throw new Error(getErrorMessage(error, "Не удалось создать задачу"), {
            cause: error,
        });
    }
};

export const updateTask = async (id, task) => {
    try {
        const { data } = await api.put(`/kanban/${id}`, JSON.stringify(task));
        return data.tasks ?? [];
    } catch (error) {
        throw new Error(getErrorMessage(error, "Не удалось сохранить задачу"), {
            cause: error,
        });
    }
};

export const deleteTask = async (id) => {
    try {
        const { data } = await api.delete(`/kanban/${id}`);
        return data.tasks ?? [];
    } catch (error) {
        throw new Error(getErrorMessage(error, "Не удалось удалить задачу"), {
            cause: error,
        });
    }
};