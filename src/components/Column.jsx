import Cards from "./Card";

const Column = ({columnStatus}) => {
    return (
        <div className="main__column">
            <div className="column__title">
                <p>{columnStatus}</p>
            </div>
            <Cards />
        </div>
    );
};

export default Column;