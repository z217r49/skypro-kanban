import { useCallback, useEffect, useMemo, useState } from "react";
import { TaskContext } from "./TaskContext";
import {
    createTask as createTaskRequest,
    deleteTask as deleteTaskRequest,
    getTasks,
    updateTask as updateTaskRequest,
} from "../services/tasks";
import { normalizeTask } from "../utils/task";

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    // Очистка списка при выходе из аккаунта.
    useEffect(() => {
        const handleLogout = () => {
            setTasks([]);
            setError("");
            setIsLoading(false);
        };

        window.addEventListener("kanban:logout", handleLogout);

        return () => {
            window.removeEventListener("kanban:logout", handleLogout);
        };
    }, []);

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

export default TaskProvider;