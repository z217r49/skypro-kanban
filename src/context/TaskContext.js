import { createContext, useContext } from "react";

export const TaskContext = createContext();

export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks должен использоваться внутри TaskProvider");
    }

    return context;
}

export default TaskContext;