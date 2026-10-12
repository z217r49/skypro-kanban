import Column from "./Column";

const Main = () => {
    return (
        <main className="main">
            <div className="container">

                <div className="main__block">
                    <div className="main__content">
                        <Column columnStatus="БЕЗ СТАТУСА" />
                        <Column columnStatus="НУЖНО СДЕЛАТЬ" />
                        <Column columnStatus="В РАБОТЕ" />
                        <Column columnStatus="ТЕСТИРОВАНИЕ" />
                        <Column columnStatus="ГОТОВО" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;