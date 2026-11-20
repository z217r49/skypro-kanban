import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { LIMITS, isBlank } from "../../utils/validation";
import Message from "../ui/Message";
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

const EMPTY_ERROR =
    "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.";
const AUTH_ERROR =
    "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.";

export default function Login() {
    const { login } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const isRegistered = Boolean(location.state?.registered);
    const registeredLogin = location.state?.login ?? "";

    const [values, setValues] = useState({ login: registeredLogin, password: "" });
    const [invalidFields, setInvalidFields] = useState({});
    const [errorText, setErrorText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasError = Boolean(errorText);
    const isDisabled = isSubmitting || hasError;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        setErrorText("");
        setInvalidFields({});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const emptyFields = {};
        if (isBlank(values.login)) emptyFields.login = true;
        if (isBlank(values.password)) emptyFields.password = true;

        if (Object.keys(emptyFields).length > 0) {
            setInvalidFields(emptyFields);
            setErrorText(EMPTY_ERROR);
            return;
        }

        setInvalidFields({});
        setErrorText("");
        setIsSubmitting(true);

        try {
            await login({ login: values.login.trim(), password: values.password });
            navigate("/", { replace: true });
        } catch {

            setInvalidFields({ login: true, password: true });
            setErrorText(AUTH_ERROR);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SWrapper $dark={isDark}>
            <SContainerSignin>
                <SModal $dark={isDark}>
                    <SModalBlock $dark={isDark}>
                        <SModalTtl>
                            <h2>Вход</h2>
                        </SModalTtl>

                        <SModalFormLogin
                            id="formLogIn"
                            action="#"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <SModalInput
                                $dark={isDark}
                                type="text"
                                name="login"
                                id="formLogin"
                                placeholder="Эл. почта"
                                value={values.login}
                                onChange={handleChange}
                                aria-invalid={Boolean(invalidFields.login)}
                                maxLength={LIMITS.login}
                                autoComplete="username"
                            />

                            <SModalInput
                                $dark={isDark}
                                type="password"
                                name="password"
                                id="formPassword"
                                placeholder="Пароль"
                                value={values.password}
                                onChange={handleChange}
                                aria-invalid={Boolean(invalidFields.password)}
                                maxLength={LIMITS.password}
                                autoComplete="current-password"
                            />

                            <Message type="error">{errorText}</Message>

                            <SModalBtnEnter id="btnEnter" type="submit" disabled={isDisabled}>
                                {isSubmitting ? "Вход..." : "Войти"}
                            </SModalBtnEnter>
                        </SModalFormLogin>

                        {isRegistered && !hasError && (
                            <Message type="success">
                                Регистрация прошла успешно. Войдите с новыми данными.
                            </Message>
                        )}

                        <SModalFormGroup>
                            <p>Нужно зарегистрироваться?</p>
                            <Link to="/register">Регистрируйтесь здесь</Link>
                        </SModalFormGroup>
                    </SModalBlock>
                </SModal>
            </SContainerSignin>
        </SWrapper>
    );
}