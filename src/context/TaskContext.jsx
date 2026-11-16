import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
    createTask as createTaskRequest,
    deleteTask as deleteTaskRequest,
    getTasks,
    updateTask as updateTaskRequest,
} from "../services/tasks";
import { normalizeTask } from "../utils/task";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    // Данные авторизации
    const { isAuth } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Загрузка списка задач с сервера
    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            const data = await getTasks();
            setTasks(data.map(normalizeTask));
        } catch (err) {
            setTasks([]);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Добавление задачи
    const addTask = useCallback(async (task) => {
        const data = await createTaskRequest(task);
        setTasks(data.map(normalizeTask));
        return data;
    }, []);

    // Обновление задачи
    const updateTask = useCallback(async (id, task) => {
        const data = await updateTaskRequest(id, task);
        setTasks(data.map(normalizeTask));
        return data;
    }, []);

    // Удаление задачи
    const removeTask = useCallback(async (id) => {
        const data = await deleteTaskRequest(id);
        setTasks(data.map(normalizeTask));
        return data;
    }, []);

    useEffect(() => {
        if (isAuth) {
            return;
        }

        setTasks([]);
        setError("");
        setIsLoading(false);
    }, [isAuth]);

    const value = useMemo(
        () => ({
            tasks,
            isLoading,
            error,
            fetchTasks,
            addTask,
            updateTask,
            removeTask,
        }),
        [tasks, isLoading, error, fetchTasks, addTask, updateTask, removeTask]
    );

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Кастомный хук
export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks должен использоваться внутри TaskProvider");
    }

    return context;
}

export default TaskContext;