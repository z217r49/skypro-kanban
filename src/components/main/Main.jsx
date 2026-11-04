import { useEffect, useState } from "react";
import Column from "../column/Column";
import { cardList } from "../../data";
import { SMain, SMainBlock, SMainContent, SLoading } from "./Main.styled";

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
        <SMain>
            <div className="container">
                <SMainBlock>
                    {isLoading ? (
                        <SLoading>Данные загружаются</SLoading>
                    ) : (
                        <SMainContent>
                            {COLUMNS.map(({ title, status }) => (
                                <Column
                                    key={status}
                                    columnStatus={title}
                                    cards={cardList.filter((card) => card.status === status)}
                                />
                            ))}
                        </SMainContent>
                    )}
                </SMainBlock>
            </div>
        </SMain>
    );
};

export default Main;