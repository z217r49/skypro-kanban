import { useEffect, useState } from "react";
import Column from "./Column";
import { cardList } from "../data";

const COLUMNS = [
    { title: "БЕЗ СТАТУСА", status: "Без статуса" },
    { title: "НУЖНО СДЕЛАТЬ", status: "Нужно сделать" },
    { title: "В РАБОТЕ", status: "В работе" },
    { title: "ТЕСТИРОВАНИЕ", status: "Тестирование" },
    { title: "ГОТОВО", status: "Готово" },
];

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="main">
            <div className="container">
                <div className="main__block">
                    {isLoading ? (
                        <p className="loading">Данные загружаются</p>
                    ) : (
                        <div className="main__content">
                            {COLUMNS.map(({ title, status }) => (
                                <Column
                                    key={status}
                                    columnStatus={title}
                                    cards={cardList.filter((card) => card.status === status)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Main;