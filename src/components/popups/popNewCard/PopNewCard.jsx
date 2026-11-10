import { Link } from "react-router-dom";
import Calendar from "../../calendar/Calendar";
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

const PopNewCard = () => {
    return (
        <SPopNewCard id="popNewCard">
            <SPopNewCardContainer>
                <SPopNewCardBlock>
                    <SPopNewCardContent>
                        <SPopNewCardTtl>Создание задачи</SPopNewCardTtl>
                        <SPopNewCardClose as={Link} to="/">&#10006;</SPopNewCardClose>
                        <SPopNewCardWrap>
                            <SPopNewCardForm id="formNewCard" action="#">
                                <SFormNewBlock>
                                    <SSubttl htmlFor="formTitle">Название задачи</SSubttl>
                                    <SFormNewInput
                                        type="text"
                                        name="name"
                                        id="formTitle"
                                        placeholder="Введите название задачи..."
                                        autoFocus
                                    />
                                </SFormNewBlock>
                                <SFormNewBlock>
                                    <SSubttl htmlFor="textArea">Описание задачи</SSubttl>
                                    <SFormNewArea
                                        name="text"
                                        id="textArea"
                                        placeholder="Введите описание задачи..."
                                    />
                                </SFormNewBlock>
                            </SPopNewCardForm>

                            <Calendar />
                        </SPopNewCardWrap>

                        <SCategories>
                            <SCategoriesP>Категория</SCategoriesP>
                            <SCategoriesThemes>
                                <SCategoriesTheme $color="orange" $active>
                                    <p>Web Design</p>
                                </SCategoriesTheme>
                                <SCategoriesTheme $color="green">
                                    <p>Research</p>
                                </SCategoriesTheme>
                                <SCategoriesTheme $color="purple">
                                    <p>Copywriting</p>
                                </SCategoriesTheme>
                            </SCategoriesThemes>
                        </SCategories>

                        <SFormNewCreate id="btnCreate">Создать задачу</SFormNewCreate>
                    </SPopNewCardContent>
                </SPopNewCardBlock>
            </SPopNewCardContainer>
        </SPopNewCard>
    );
};

export default PopNewCard;