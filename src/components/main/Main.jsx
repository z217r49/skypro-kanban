import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Column from "../column/Column";
import { getTasks } from "../../services/tasks";
import { normalizeTask } from "../../utils/task";
import {
    SMain,
    SMainBlock,
    SMainContent,
    SLoading,
    SError,
    SRetry,
} from "./Main.styled";

const COLUMNS = [
    { title: "БЕЗ СТАТУСА", status: "Без статуса" },
    { title: "НУЖНО СДЕЛАТЬ", status: "Нужно сделать" },
    { title: "В РАБОТЕ", status: "В работе" },
    { title: "ТЕСТИРОВАНИЕ", status: "Тестирование" },
    { title: "ГОТОВО", status: "Готово" },
];

const Main = () => {
    const location = useLocation();

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTasks = useCallback(async () => {
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

    useEffect(() => {
        if (location.pathname !== "/") {
            return;
        }

        loadTasks();
    }, [location.pathname, loadTasks]);

    return (
        <SMain>
            <div className="container">
                <SMainBlock>
                    {isLoading ? (
                        <SLoading>Данные загружаются</SLoading>
                    ) : error ? (
                        <SError>
                            <span>{error}</span>
                            <SRetry type="button" onClick={loadTasks}>
                                Повторить
                            </SRetry>
                        </SError>
                    ) : (
                        <SMainContent>
                            {COLUMNS.map(({ title, status }) => (
                                <Column
                                    key={status}
                                    columnStatus={title}
                                    cards={tasks.filter((task) => task.status === status)}
                                />
                            ))}
                        </SMainContent>
                    )}
                </SMainBlock>
            </div>
        </SMain>
    );
};

export default Main;