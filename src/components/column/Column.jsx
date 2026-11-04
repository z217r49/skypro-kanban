import Card from "../card/Card";
import {
    SColumn,
    SColumnTitles,
    SColumnP,
    SCards,
} from "./Column.styled"

const Column = ({ columnStatus, cards }) => {
    return (
        <SColumn>
            <SColumnTitles>
                <SColumnP>{columnStatus}</SColumnP>
            </SColumnTitles>
            <SCards>
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </SCards>
        </SColumn>
    );
};

export default Column;