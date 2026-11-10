import { Link } from "react-router-dom";
import {
    S404,
    S404Container,
    S404Block,
    S404Code,
    S404Ttl,
    S404Text,
    S404Link,
} from "./404.styled";

const Comp404 = () => {
    return (
        <S404>
            <S404Container>
                <S404Block>
                    <S404Code>404</S404Code>
                    <S404Ttl>Страница не найдена</S404Ttl>
                    <S404Text>
                        Возможно, страница была удалена или вы перешли по неверной ссылке.
                    </S404Text>
                    <S404Link as={Link} to="/">
                        На главную
                    </S404Link>
                </S404Block>
            </S404Container>
        </S404>
    );
};

export default Comp404;