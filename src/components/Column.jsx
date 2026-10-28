import Card from "./Card";

const Column = ({ columnStatus, cards }) => {
    return (
        <div className="main__column">
            <div className="column__title">
                <p>{columnStatus}</p>
            </div>
            <div className="cards">
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Column;