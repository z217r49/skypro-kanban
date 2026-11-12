import { Link } from "react-router-dom";
import Calendar from "../../calendar/Calendar";
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

const PopBrowse = ({ card, cardId }) => {
    const topic = card?.topic ?? "Web Design";
    const topicColor = TOPIC_COLOR[topic] ?? "gray";
    const id = card?.id ?? cardId;

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

                        {/* id, полученный из адреса страницы */}
                        <SStatusP>ID задачи: {id}</SStatusP>

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
                            <SPopBrowseForm id="formBrowseCard" action="#">
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
                                <SBtnBor>
                                    <a href="#">Редактировать задачу</a>
                                </SBtnBor>
                                <SBtnBor>
                                    <a href="#">Удалить задачу</a>
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
                                <SBtnBor>
                                    <a href="#">Отменить</a>
                                </SBtnBor>
                                <SBtnBor id="btnDelete">
                                    <a href="#">Удалить задачу</a>
                                </SBtnBor>
                            </SBtnGroup>
                            <SBtnBg>
                                <a href="#">Закрыть</a>
                            </SBtnBg>
                        </SPopBrowseBtnEdit>
                    </SPopBrowseContent>
                </SPopBrowseBlock>
            </SPopBrowseContainer>
        </SPopBrowse>
    );
};

export default PopBrowse;