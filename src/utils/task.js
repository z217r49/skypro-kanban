export const formatDate = (value) => {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}.${month}.${year}`;
};

export const normalizeTask = (task) => ({
    id: task._id ?? task.id,
    title: task.title ?? "",
    topic: task.topic ?? "Research",
    status: task.status ?? "Без статуса",
    description: task.description ?? "",
    date: formatDate(task.date),
    dateIso: task.date ?? "",
});