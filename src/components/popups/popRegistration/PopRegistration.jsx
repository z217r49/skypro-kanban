import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Message from "../../ui/Message";
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
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", login: "", password: "" });
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

        if (!form.name.trim()) {
            nextErrors.name = "Введите имя";
        }

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
            await register({
                name: form.name.trim(),
                login: form.login.trim(),
                password: form.password,
            });

            navigate("/", { replace: true });
        } catch (error) {
            setApiError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SWrapper $dark={dark}>
            <SContainerSignup>
                <SModal>
                    <SModalBlock $dark={dark}>
                        <SModalTtl>
                            <h2>Регистрация</h2>
                        </SModalTtl>
                        <SModalFormLogin id="formLogUp" onSubmit={handleSubmit} noValidate>
                            <SModalInput
                                $dark={dark}
                                className="first-name"
                                type="text"
                                name="name"
                                id="first-name"
                                placeholder="Имя"
                                autoComplete="name"
                                aria-invalid={Boolean(fieldErrors.name) || Boolean(apiError)}
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Message>{fieldErrors.name}</Message>

                            <SModalInput
                                $dark={dark}
                                className="login"
                                type="text"
                                name="login"
                                id="loginReg"
                                placeholder="Логин"
                                autoComplete="username"
                                aria-invalid={Boolean(fieldErrors.login) || Boolean(apiError)}
                                value={form.login}
                                onChange={handleChange}
                            />
                            <Message>{fieldErrors.login}</Message>

                            <SModalInput
                                $dark={dark}
                                className="password-first"
                                type="password"
                                name="password"
                                id="passwordFirst"
                                placeholder="Пароль"
                                autoComplete="new-password"
                                aria-invalid={Boolean(fieldErrors.password) || Boolean(apiError)}
                                value={form.password}
                                onChange={handleChange}
                            />
                            <Message>{fieldErrors.password}</Message>

                            <Message>{apiError}</Message>

                            <SModalBtnSignupEnt
                                type="submit"
                                id="SignUpEnter"
                                disabled={isDisabled}
                            >
                                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
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