import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "../../calendar/Calendar";
import Message from "../../ui/Message";
import { deleteTask } from "../../../services/tasks";
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
    SFormBrowseArea,
    SPopBrowseBtnBrowse,
    SPopBrowseBtnEdit,
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

    const [isDeleting, setIsDeleting] = useState(false);
    const [actionError, setActionError] = useState("");

    const topic = card?.topic ?? "Web Design";
    const topicColor = TOPIC_COLOR[topic] ?? "gray";
    const id = card?.id ?? cardId;

    const handleDelete = async () => {
        if (!card?.id) {
            return;
        }

        setIsDeleting(true);
        setActionError("");

        try {
            await deleteTask(card.id);
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
                <SPopBrowseBlock>
                    <SPopBrowseContent>
                        <SPopBrowseTopBlock>
                            <SPopBrowseTtl>{card?.title ?? "Название задачи"}</SPopBrowseTtl>
                            <SThemeTop $color={topicColor}>
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
                                {STATUSES.map((status) => (
                                    <SStatusTheme
                                        key={status}
                                        $color={status === card?.status ? "gray" : undefined}
                                    >
                                        <p>{status}</p>
                                    </SStatusTheme>
                                ))}
                            </SStatusThemes>
                        </SPopBrowseStatus>

                        <SPopBrowseWrap>
                            <SPopBrowseForm id="formBrowseCard">
                                <SFormBrowseBlock>
                                    <SSubttl htmlFor="textArea01">Описание задачи</SSubttl>
                                    <SFormBrowseArea
                                        name="text"
                                        id="textArea01"
                                        readOnly
                                        value={card?.description ?? ""}
                                        placeholder="Введите описание задачи..."
                                    />
                                </SFormBrowseBlock>
                            </SPopBrowseForm>

                            <Calendar />
                        </SPopBrowseWrap>

                        <SThemeDown>
                            <SStatusP>Категория</SStatusP>
                            <SThemeDownTheme $color={topicColor}>
                                <p>{topic}</p>
                            </SThemeDownTheme>
                        </SThemeDown>

                        <SPopBrowseBtnBrowse>
                            <SBtnGroup>
                                <SBtnBor type="button">Редактировать задачу</SBtnBor>
                                <SBtnBor
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting || !card?.id}
                                >
                                    {isDeleting ? "Удаление..." : "Удалить задачу"}
                                </SBtnBor>
                            </SBtnGroup>
                            <SBtnBg>
                                <Link to="/">Закрыть</Link>
                            </SBtnBg>
                        </SPopBrowseBtnBrowse>

                        <SPopBrowseBtnEdit $hide>
                            <SBtnGroup>
                                <SBtnBg>
                                    <Link to="/">Закрыть</Link>
                                </SBtnBg>
                                <SBtnBor type="button">Отменить</SBtnBor>
                                <SBtnBor type="button" id="btnDelete">
                                    Удалить задачу
                                </SBtnBor>
                            </SBtnGroup>
                            <SBtnBg>
                                <Link to="/">Закрыть</Link>
                            </SBtnBg>
                        </SPopBrowseBtnEdit>
                    </SPopBrowseContent>
                </SPopBrowseBlock>
            </SPopBrowseContainer>
        </SPopBrowse>
    );
};

export default PopBrowse;