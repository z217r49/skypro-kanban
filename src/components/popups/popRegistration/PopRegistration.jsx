import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { getErrorMessage } from "../../../services/api";
import {
    LIMITS,
    isBlank,
    validateName,
    validateLogin,
    validatePassword,
} from "../../../utils/validation";
import Message from "../../ui/Message";
import {
    SContainerSignup,
    SModal,
    SModalBlock,
    SModalTtl,
    SModalFormLogin,
    SModalInput,
    SModalBtnSignupEnt,
    SModalFormGroup,
} from "./PopRegistration.styled";

const EMPTY_ERROR =
    "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.";
const INVALID_ERROR =
    "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.";

const getInvalidFieldsByMessage = (message) => {
    const text = String(message ?? "").toLowerCase();

    if (text.includes("email") || text.includes("почт") || text.includes("логин")) {
        return { login: true };
    }

    if (text.includes("пароль")) {
        return { password: true };
    }

    if (text.includes("имя") || text.includes("имени") || text.includes("name")) {
        return { name: true };
    }

    return { name: true, login: true, password: true };
};

export default function PopRegistration() {
    const { register } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const [values, setValues] = useState({ name: "", login: "", password: "" });
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
        if (isBlank(values.name)) emptyFields.name = true;
        if (isBlank(values.login)) emptyFields.login = true;
        if (isBlank(values.password)) emptyFields.password = true;

        if (Object.keys(emptyFields).length > 0) {
            setInvalidFields(emptyFields);
            setErrorText(EMPTY_ERROR);
            return;
        }

        const formatErrors = {};
        if (validateName(values.name)) formatErrors.name = true;
        if (validateLogin(values.login)) formatErrors.login = true;
        if (validatePassword(values.password)) formatErrors.password = true;

        if (Object.keys(formatErrors).length > 0) {
            setInvalidFields(formatErrors);
            setErrorText(INVALID_ERROR);
            return;
        }

        setInvalidFields({});
        setErrorText("");
        setIsSubmitting(true);

        try {
            await register({
                name: values.name.trim(),
                login: values.login.trim(),
                password: values.password,
            });

            navigate("/login", {
                replace: true,
                state: { registered: true, login: values.login.trim() },
            });
        } catch (error) {
            setInvalidFields(getInvalidFieldsByMessage(getErrorMessage(error)));
            setErrorText(INVALID_ERROR);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SContainerSignup>
            <SModal $dark={isDark}>
                <SModalBlock $dark={isDark}>
                    <SModalTtl>
                        <h2>Регистрация</h2>
                    </SModalTtl>

                    <SModalFormLogin
                        id="formSignUp"
                        action="#"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <SModalInput
                            $dark={isDark}
                            type="text"
                            name="name"
                            id="formName"
                            placeholder="Имя"
                            value={values.name}
                            onChange={handleChange}
                            aria-invalid={Boolean(invalidFields.name)}
                            maxLength={LIMITS.name}
                            autoComplete="name"
                        />

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
                            autoComplete="new-password"
                        />

                        <Message type="error">{errorText}</Message>

                        <SModalBtnSignupEnt
                            id="btnSignUp"
                            type="submit"
                            disabled={isDisabled}
                        >
                            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
                        </SModalBtnSignupEnt>
                    </SModalFormLogin>

                    <SModalFormGroup>
                        <p>Уже есть аккаунт?&nbsp;
                            <Link to="/login">Войдите здесь</Link>
                        </p>
                    </SModalFormGroup>
                </SModalBlock>
            </SModal>
        </SContainerSignup>
    );
}