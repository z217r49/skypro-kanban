export const LIMITS = {
    name: 40,
    login: 40,
    password: 60,
    title: 120,
    description: 1000,
};

const NAME_PATTERN = /^[A-Za-zА-Яа-яЁё\s-]+$/;

const LOGIN_PATTERN = /^[A-Za-zА-Яа-яЁё0-9._@-]+$/;

const PASSWORD_PATTERN = /^[^\s<>{}`\\]+$/;

const CODE_CHARS = /[<>{}`\\]/;

export const isBlank = (value) => String(value ?? "").trim().length === 0;

export const hasCodeChars = (value) => CODE_CHARS.test(String(value ?? ""));

export const validateName = (value) => {
    const v = String(value ?? "").trim();

    if (!v) {
        return "Введите имя";
    }

    if (v.length > LIMITS.name) {
        return `Имя не должно быть длиннее ${LIMITS.name} символов`;
    }

    if (!NAME_PATTERN.test(v)) {
        return "Имя может содержать только буквы, пробел и дефис";
    }

    return "";
};

export const validateLogin = (value) => {
    const v = String(value ?? "").trim();

    if (!v) {
        return "Введите логин";
    }

    if (v.length > LIMITS.login) {
        return `Логин не должен быть длиннее ${LIMITS.login} символов`;
    }

    if (!LOGIN_PATTERN.test(v)) {
        return "Логин может содержать только буквы, цифры и символы . _ - @";
    }

    return "";
};

export const validatePassword = (value) => {
    const v = String(value ?? "");

    if (!v.trim()) {
        return "Введите пароль";
    }

    if (v.length > LIMITS.password) {
        return `Пароль не должен быть длиннее ${LIMITS.password} символов`;
    }

    if (!PASSWORD_PATTERN.test(v)) {
        return "Пароль не должен содержать пробелы и символы < > { } ` \\";
    }

    return "";
};

export const validateTitle = (value) => {
    const v = String(value ?? "").trim();

    if (!v) {
        return "Введите название задачи";
    }

    if (v.length > LIMITS.title) {
        return `Название не должно быть длиннее ${LIMITS.title} символов`;
    }

    if (hasCodeChars(v)) {
        return "Название не должно содержать символы < > { } ` \\";
    }

    return "";
};

export const validateDescription = (value) => {
    const v = String(value ?? "").trim();

    if (v.length > LIMITS.description) {
        return `Описание не должно быть длиннее ${LIMITS.description} символов`;
    }

    if (hasCodeChars(v)) {
        return "Описание не должно содержать символы < > { } ` \\";
    }

    return "";
};