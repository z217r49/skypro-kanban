import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PopBrowse from "../components/popups/popBrowse/PopBrowse";
import { useTasks } from "../context/TaskContext";

const PageBrowse = () => {
    const { id } = useParams();
    const { tasks, isLoading, error, fetchTasks } = useTasks();

    const card = tasks.find((task) => task.id === id) ?? null;

    useEffect(() => {
        if (tasks.length > 0) {
            return;
        }

        fetchTasks();
    }, [tasks.length, fetchTasks]);

    const notFound = !isLoading && !card && tasks.length > 0;

    return (
        <PopBrowse
            card={card}
            cardId={id}
            isLoading={isLoading}
            error={error || (notFound ? "Задача не найдена" : "")}
        />
    );
};

export default PageBrowse;