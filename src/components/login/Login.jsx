import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    SWrapper,
    SContainerSignin,
    SModal,
    SModalBlock,
    SModalTtl,
    SModalFormLogin,
    SModalInput,
    SModalBtnEnter,
    SModalFormGroup,
} from "./Login.styled";

const PopLogin = ({ dark = false }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        login({
            name: "Ivan Ivanov",
            email: email.trim() || "ivan.ivanov@gmail.com",
        });

        const from = location.state?.from?.pathname ?? "/";
        navigate(from, { replace: true });
    };

    return (
        <SWrapper $dark={dark}>
            <SContainerSignin>
                <SModal>
                    <SModalBlock $dark={dark}>
                        <SModalTtl>
                            <h2>Вход</h2>
                        </SModalTtl>
                        <SModalFormLogin id="formLogIn" onSubmit={handleSubmit}>
                            <SModalInput
                                $dark={dark}
                                type="email"
                                name="login"
                                id="formlogin"
                                placeholder="Эл. почта"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <SModalInput
                                $dark={dark}
                                type="password"
                                name="password"
                                id="formpassword"
                                placeholder="Пароль"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <SModalBtnEnter type="submit" id="btnEnter">
                                Войти
                            </SModalBtnEnter>
                            <SModalFormGroup>
                                <p>Нужно зарегистрироваться?</p>
                                <Link to="/register">Регистрируйтесь здесь</Link>
                            </SModalFormGroup>
                        </SModalFormLogin>
                    </SModalBlock>
                </SModal>
            </SContainerSignin>
        </SWrapper>
    );
};

export default PopLogin;