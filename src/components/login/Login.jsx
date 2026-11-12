import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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

const PopLogin = ({ dark = false }) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({ login: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasError = Boolean(apiError) || Object.keys(fieldErrors).length > 0;
    const isDisabled = isSubmitting || hasError;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        setFieldErrors((prev) => {
            if (!prev[name]) {
                return prev;
            }

            const next = { ...prev };
            delete next[name];
            return next;
        });

        setApiError("");
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.login.trim()) {
            nextErrors.login = "Введите логин";
        }

        if (!form.password.trim()) {
            nextErrors.password = "Введите пароль";
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validate();
        setFieldErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setApiError("");
            return;
        }

        setIsSubmitting(true);
        setApiError("");

        try {
            await login({
                login: form.login.trim(),
                password: form.password,
            });

            const from = location.state?.from?.pathname;
            navigate(from && from !== "/exit" ? from : "/", { replace: true });
        } catch (error) {
            setApiError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SWrapper $dark={dark}>
            <SContainerSignin>
                <SModal>
                    <SModalBlock $dark={dark}>
                        <SModalTtl>
                            <h2>Вход</h2>
                        </SModalTtl>
                        <SModalFormLogin id="formLogIn" onSubmit={handleSubmit} noValidate>
                            <SModalInput
                                $dark={dark}
                                type="text"
                                name="login"
                                id="formlogin"
                                placeholder="Логин"
                                autoComplete="username"
                                aria-invalid={Boolean(fieldErrors.login) || Boolean(apiError)}
                                value={form.login}
                                onChange={handleChange}
                            />
                            <Message>{fieldErrors.login}</Message>

                            <SModalInput
                                $dark={dark}
                                type="password"
                                name="password"
                                id="formpassword"
                                placeholder="Пароль"
                                autoComplete="current-password"
                                aria-invalid={Boolean(fieldErrors.password) || Boolean(apiError)}
                                value={form.password}
                                onChange={handleChange}
                            />
                            <Message>{fieldErrors.password}</Message>

                            <Message>{apiError}</Message>

                            <SModalBtnEnter type="submit" id="btnEnter" disabled={isDisabled}>
                                {isSubmitting ? "Вход..." : "Войти"}
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