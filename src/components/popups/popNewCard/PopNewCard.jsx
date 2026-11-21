import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "../../calendar/Calendar";
import Message from "../../ui/Message";
import { useTasks } from "../../../context/TaskContext";
import {
    LIMITS,
    validateDescription,
    validateTitle,
} from "../../../utils/validation";
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
    const { addTask } = useTasks();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState(TOPICS[0].value);
    const [date, setDate] = useState(() => new Date());
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTopicKeyDown = (event, value) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setTopic(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = validateTitle(title) || validateDescription(description);

        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            await addTask({
                title: title.trim(),
                description: description.trim(),
                topic,
                status: "Без статуса",
                date: date.toISOString(),
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
                <SPopNewCardBlock className="kanban-modal">
                    <SPopNewCardContent>
                        <SPopNewCardTtl>Создание задачи</SPopNewCardTtl>
                        <SPopNewCardClose as={Link} to="/">&#10006;</SPopNewCardClose>
                        <SPopNewCardWrap>
                            <SPopNewCardForm id="formNewCard" onSubmit={handleSubmit} noValidate>
                                <SFormNewBlock>
                                    <SSubttl htmlFor="formTitle">Название задачи</SSubttl>
                                    <SFormNewInput
                                        type="text"
                                        name="name"
                                        id="formTitle"
                                        placeholder="Введите название задачи..."
                                        autoFocus
                                        maxLength={LIMITS.title}
                                        aria-invalid={Boolean(error)}
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
                                        maxLength={LIMITS.description}
                                        aria-invalid={Boolean(error)}
                                        value={description}
                                        onChange={(event) => {
                                            setDescription(event.target.value);
                                            setError("");
                                        }}
                                    />
                                </SFormNewBlock>
                            </SPopNewCardForm>

                            <Calendar value={date} onChange={setDate} />
                        </SPopNewCardWrap>

                        <SCategories>
                            <SCategoriesP id="categoriesLabel">Категория</SCategoriesP>
                            <SCategoriesThemes
                                role="radiogroup"
                                aria-labelledby="categoriesLabel"
                            >
                                {TOPICS.map(({ value, color }) => (
                                    <SCategoriesTheme
                                        key={value}
                                        className="kanban-chip"
                                        role="radio"
                                        tabIndex={0}
                                        aria-checked={topic === value}
                                        $color={color}
                                        $active={topic === value}
                                        onClick={() => setTopic(value)}
                                        onKeyDown={(event) => handleTopicKeyDown(event, value)}
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