import { Fragment, useState } from "react";
import Card from "../card/Card";
import { useTasks } from "../../context/TaskContext";
import {
    SColumn,
    SColumnTitles,
    SColumnP,
    SCards,
    SCardPlaceholder,
} from "./Column.styled";

const Column = ({ columnStatus, status, cards }) => {
    const { tasks, updateTask } = useTasks();
    const [isOver, setIsOver] = useState(false);
    const [dropIndex, setDropIndex] = useState(null);

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setIsOver(true);

        const cardElements = Array.from(
            event.currentTarget.querySelectorAll('[draggable="true"]')
        );

        let index = cardElements.length;

        for (let i = 0; i < cardElements.length; i += 1) {
            const rect = cardElements[i].getBoundingClientRect();

            if (event.clientY < rect.top + rect.height / 2) {
                index = i;
                break;
            }
        }

        setDropIndex((prev) => (prev === index ? prev : index));
    };

    const handleDragLeave = (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) {
            return;
        }

        setIsOver(false);
        setDropIndex(null);
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        setIsOver(false);
        setDropIndex(null);

        const id = event.dataTransfer.getData("text/plain");
        const card = tasks.find((task) => task.id === id);

        if (!card || card.status === status) {
            return;
        }

        try {
            await updateTask(id, {
                title: card.title,
                description: card.description,
                topic: card.topic,
                status,
                date: card.dateIso || new Date().toISOString(),
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <SColumn
            $isOver={isOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <SColumnTitles>
                <SColumnP>{columnStatus}</SColumnP>
            </SColumnTitles>
            <SCards>
    {cards.map((card, index) => (
        <Fragment key={card.id}>
            {isOver && dropIndex === index && <SCardPlaceholder />}
            <Card card={card} />
        </Fragment>
    ))}
    {isOver && (dropIndex === null || dropIndex >= cards.length) && <SCardPlaceholder />}
</SCards>
        </SColumn>
    );
};

export default Column;