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
    SPopBrowse,
    SPopBrowseContainer,
    SPopBrowseBlock,
    SPopBrowseContent,
    SPopBrowseTopBlock,
    SPopBrowseTtl,
    SThemeTop,
    SThemeDown,
    SThemeDownTheme,
    SPopBrowseStatus,
    SStatusP,
    SStatusThemes,
    SStatusTheme,
    SPopBrowseWrap,
    SPopBrowseForm,
    SFormBrowseBlock,
    SSubttl,
    SFormBrowseInput,
    SFormBrowseArea,
    SPopBrowseBtnBrowse,
    SBtnGroup,
    SBtnBor,
    SBtnBg,
} from "./PopBrowse.styled";

const TOPIC_COLOR = {
    "Web Design": "orange",
    Research: "green",
    Copywriting: "purple",
};

const STATUSES = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
];

const PopBrowse = ({ card, cardId, isLoading = false, error = "" }) => {
    const navigate = useNavigate();
    const { removeTask, updateTask } = useTasks();

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [actionError, setActionError] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "Без статуса",
        date: new Date(),
    });

    const topic = card?.topic ?? "Web Design";
    const topicColor = TOPIC_COLOR[topic] ?? "gray";
    const id = card?.id ?? cardId;

    const startEditing = () => {
        if (!card) {
            return;
        }

        setForm({
            title: card.title,
            description: card.description,
            status: card.status,
            date: card.dateIso ? new Date(card.dateIso) : new Date(),
        });
        setActionError("");
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setActionError("");
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!card?.id) {
            return;
        }

        const validationError = validateTitle(form.title) || validateDescription(form.description);

        if (validationError) {
            setActionError(validationError);
            return;
        }

        setIsSaving(true);
        setActionError("");

        try {
            await updateTask(card.id, {
                title: form.title.trim(),
                description: form.description.trim(),
                topic: card.topic,
                status: form.status,
                date: (form.date ?? new Date()).toISOString(),
            });

            setIsEditing(false);
        } catch (err) {
            setActionError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!card?.id) {
            return;
        }

        setIsDeleting(true);
        setActionError("");

        try {
            await removeTask(card.id);
            navigate("/", { replace: true });
        } catch (err) {
            setActionError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <SPopBrowse id="popBrowse">
            <SPopBrowseContainer>
                <SPopBrowseBlock className="kanban-modal">
                    <SPopBrowseContent>
                        <SPopBrowseTopBlock>
                            {isEditing ? (
                                <SFormBrowseInput
                                    type="text"
                                    value={form.title}
                                    maxLength={LIMITS.title}
                                    aria-invalid={Boolean(actionError)}
                                    onChange={(event) => {
                                        setForm((prev) => ({ ...prev, title: event.target.value }));
                                        setActionError("");
                                    }}
                                    placeholder="Название задачи"
                                />
                            ) : (
                                <SPopBrowseTtl>{card?.title ?? "Название задачи"}</SPopBrowseTtl>
                            )}
                            <SThemeTop className="kanban-chip" $color={topicColor}>
                                <p>{topic}</p>
                            </SThemeTop>
                        </SPopBrowseTopBlock>

                        <SStatusP>ID задачи: {id}</SStatusP>

                        {isLoading && <SStatusP>Загрузка задачи...</SStatusP>}
                        <Message>{error}</Message>
                        <Message>{actionError}</Message>

                        <SPopBrowseStatus>
                            <SStatusP>Статус</SStatusP>
                            <SStatusThemes>
                                {STATUSES.map((status) => {
                                    const isActive = isEditing
                                        ? form.status === status
                                        : card?.status === status;

                                    return (
                                        <SStatusTheme
                                            key={status}
                                            className="kanban-chip"
                                            $color={isActive ? "gray" : undefined}
                                            style={{ cursor: isEditing ? "pointer" : "default" }}
                                            onClick={() =>
                                                isEditing &&
                                                setForm((prev) => ({ ...prev, status }))
                                            }
                                        >
                                            <p>{status}</p>
                                        </SStatusTheme>
                                    );
                                })}
                            </SStatusThemes>
                        </SPopBrowseStatus>

                        <SPopBrowseWrap>
                            <SPopBrowseForm id="formBrowseCard">
                                <SFormBrowseBlock>
                                    <SSubttl htmlFor="textArea01">Описание задачи</SSubttl>
                                    <SFormBrowseArea
                                        name="text"
                                        id="textArea01"
                                        readOnly={!isEditing}
                                        maxLength={LIMITS.description}
                                        aria-invalid={Boolean(actionError)}
                                        value={isEditing ? form.description : card?.description ?? ""}
                                        onChange={(event) => {
                                            setForm((prev) => ({
                                                ...prev,
                                                description: event.target.value,
                                            }));
                                            setActionError("");
                                        }}
                                        placeholder="Введите описание задачи..."
                                    />
                                </SFormBrowseBlock>
                            </SPopBrowseForm>

                            <Calendar
                                value={isEditing ? form.date : card?.dateIso ?? ""}
                                onChange={(date) => setForm((prev) => ({ ...prev, date }))}
                                disabled={!isEditing}
                            />
                        </SPopBrowseWrap>

                        <SThemeDown>
                            <SStatusP>Категория</SStatusP>
                            <SThemeDownTheme className="kanban-chip" $color={topicColor}>
                                <p>{topic}</p>
                            </SThemeDownTheme>
                        </SThemeDown>

                        <SPopBrowseBtnBrowse>
                            {isEditing ? (
                                <SBtnGroup>
                                    <SBtnBg type="button" onClick={handleSave} disabled={isSaving}>
                                        {isSaving ? "Сохранение..." : "Сохранить"}
                                    </SBtnBg>
                                    <SBtnBor type="button" onClick={cancelEditing}>
                                        Отменить
                                    </SBtnBor>
                                    <SBtnBor
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Удаление..." : "Удалить задачу"}
                                    </SBtnBor>
                                </SBtnGroup>
                            ) : (
                                <SBtnGroup>
                                    <SBtnBor type="button" onClick={startEditing} disabled={!card}>
                                        Редактировать задачу
                                    </SBtnBor>
                                    <SBtnBor
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={isDeleting || !card?.id}
                                    >
                                        {isDeleting ? "Удаление..." : "Удалить задачу"}
                                    </SBtnBor>
                                </SBtnGroup>
                            )}
                            <SBtnBg>
                                <Link to="/">Закрыть</Link>
                            </SBtnBg>
                        </SPopBrowseBtnBrowse>
                    </SPopBrowseContent>
                </SPopBrowseBlock>
            </SPopBrowseContainer>
        </SPopBrowse>
    );
};

export default PopBrowse;