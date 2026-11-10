import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
    SWrapper,
    SContainerSignup,
    SModal,
    SModalBlock,
    SModalTtl,
    SModalFormLogin,
    SModalInput,
    SModalBtnSignupEnt,
    SModalFormGroup,
} from "./PopRegistration.styled";

const PopRegistration = ({ dark = false }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        login({
            name: name.trim() || "Ivan Ivanov",
            email: email.trim() || "ivan.ivanov@gmail.com",
        });

        navigate("/", { replace: true });
    };

    return (
        <SWrapper $dark={dark}>
            <SContainerSignup>
                <SModal>
                    <SModalBlock $dark={dark}>
                        <SModalTtl>
                            <h2>Регистрация</h2>
                        </SModalTtl>
                        <SModalFormLogin id="formLogUp" onSubmit={handleSubmit}>
                            <SModalInput
                                $dark={dark}
                                className="first-name"
                                type="text"
                                name="first-name"
                                id="first-name"
                                placeholder="Имя"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <SModalInput
                                $dark={dark}
                                className="login"
                                type="email"
                                name="login"
                                id="loginReg"
                                placeholder="Эл. почта"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <SModalInput
                                $dark={dark}
                                className="password-first"
                                type="password"
                                name="password"
                                id="passwordFirst"
                                placeholder="Пароль"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <SModalBtnSignupEnt type="submit" id="SignUpEnter">
                                Зарегистрироваться
                            </SModalBtnSignupEnt>
                            <SModalFormGroup>
                                <p>
                                    Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
                                </p>
                            </SModalFormGroup>
                        </SModalFormLogin>
                    </SModalBlock>
                </SModal>
            </SContainerSignup>
        </SWrapper>
    );
};

export default PopRegistration;