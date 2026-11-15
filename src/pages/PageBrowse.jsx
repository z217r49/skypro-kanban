import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PopBrowse from "../components/popups/popBrowse/PopBrowse";
import { getTaskById } from "../services/tasks";
import { normalizeTask } from "../utils/task";

const PageBrowse = () => {
    const { id } = useParams();

    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isCancelled = false;

        const loadTask = async () => {
            setIsLoading(true);
            setError("");

            try {
                const data = await getTaskById(id);

                if (!isCancelled) {
                    setTask(normalizeTask(data));
                }
            } catch (err) {
                if (!isCancelled) {
                    setTask(null);
                    setError(err.message);
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        };

        loadTask();

        return () => {
            isCancelled = true;
        };
    }, [id]);

    return (
        <PopBrowse
            card={task}
            cardId={id}
            isLoading={isLoading}
            error={error}
        />
    );
};

export default PageBrowse;