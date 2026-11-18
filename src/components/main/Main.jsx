import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Column from "../column/Column";
import { useTasks } from "../../context/TaskContext";
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
    const { tasks, isLoading, error, fetchTasks } = useTasks();

    useEffect(() => {
        if (location.pathname !== "/") {
            return;
        }

        if (tasks.length > 0) {
            return;
        }

        fetchTasks();
    }, [location.pathname, tasks.length, fetchTasks]);

    return (
        <SMain>
            <div className="container">
                <SMainBlock>
                    {isLoading ? (
                        <SLoading>Данные загружаются</SLoading>
                    ) : error ? (
                        <SError>
                            <span>{error}</span>
                            <SRetry type="button" onClick={fetchTasks}>
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