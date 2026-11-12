import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "../../calendar/Calendar";
import Message from "../../ui/Message";
import { createTask } from "../../../services/tasks";
import {
    SPopNewCard,
    SPopNewCardContainer,
    SPopNewCardBlock,
    SPopNewCardContent,
    SPopNewCardTtl,
    SPopNewCardClose,
    SPopNewCardWrap,
    SPopNewCardForm,
    SFormNewBlock,
    SSubttl,
    SFormNewInput,
    SFormNewArea,
    SCategories,
    SCategoriesP,
    SCategoriesThemes,
    SCategoriesTheme,
    SFormNewCreate,
} from "./PopNewCard.styled";

const TOPICS = [
    { value: "Web Design", color: "orange" },
    { value: "Research", color: "green" },
    { value: "Copywriting", color: "purple" },
];

const PopNewCard = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("Web Design");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            setError("Введите название задачи");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            await createTask({
                title: title.trim(),
                description: description.trim(),
                topic,
                status: "Без статуса",
                date: new Date().toISOString(),
            });

            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SPopNewCard id="popNewCard">
            <SPopNewCardContainer>
                <SPopNewCardBlock>
                    <SPopNewCardContent>
                        <SPopNewCardTtl>Создание задачи</SPopNewCardTtl>
                        <SPopNewCardClose as={Link} to="/">&#10006;</SPopNewCardClose>
                        <SPopNewCardWrap>
                            <SPopNewCardForm id="formNewCard" onSubmit={handleSubmit}>
                                <SFormNewBlock>
                                    <SSubttl htmlFor="formTitle">Название задачи</SSubttl>
                                    <SFormNewInput
                                        type="text"
                                        name="name"
                                        id="formTitle"
                                        placeholder="Введите название задачи..."
                                        autoFocus
                                        value={title}
                                        onChange={(event) => {
                                            setTitle(event.target.value);
                                            setError("");
                                        }}
                                    />
                                </SFormNewBlock>
                                <SFormNewBlock>
                                    <SSubttl htmlFor="textArea">Описание задачи</SSubttl>
                                    <SFormNewArea
                                        name="text"
                                        id="textArea"
                                        placeholder="Введите описание задачи..."
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </SFormNewBlock>
                            </SPopNewCardForm>

                            <Calendar />
                        </SPopNewCardWrap>

                        <SCategories>
                            <SCategoriesP>Категория</SCategoriesP>
                            <SCategoriesThemes>
                                {TOPICS.map(({ value, color }) => (
                                    <SCategoriesTheme
                                        key={value}
                                        $color={color}
                                        $active={topic === value}
                                        onClick={() => setTopic(value)}
                                    >
                                        <p>{value}</p>
                                    </SCategoriesTheme>
                                ))}
                            </SCategoriesThemes>
                        </SCategories>

                        <Message>{error}</Message>

                        <SFormNewCreate
                            type="submit"
                            form="formNewCard"
                            id="btnCreate"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Создание..." : "Создать задачу"}
                        </SFormNewCreate>
                    </SPopNewCardContent>
                </SPopNewCardBlock>
            </SPopNewCardContainer>
        </SPopNewCard>
    );
};

export default PopNewCard;