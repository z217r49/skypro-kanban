import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginRequest, register as registerRequest } from "../services/auth";
import { clearAuth, loadAuth, saveAuth } from "../services/storage";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => loadAuth()?.user ?? null);
    const [token, setToken] = useState(() => loadAuth()?.token ?? null);

    const applyAuth = useCallback((nextUser) => {
        setUser(nextUser);
        setToken(nextUser.token ?? null);
        saveAuth({ user: nextUser, token: nextUser.token ?? null });
    }, []);

    // Функция входа
    const login = useCallback(
        async ({ login, password }) => {
            const nextUser = await loginRequest({ login, password });
            applyAuth(nextUser);
            return nextUser;
        },
        [applyAuth]
    );

    // Функция регистрации
    const register = useCallback(async ({ login, name, password }) => {
        const nextUser = await registerRequest({ login, name, password });
        return nextUser;
    }, []);

    // Функция выхода
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        clearAuth();

        window.dispatchEvent(new Event("kanban:logout"));
    }, []);

    useEffect(() => {
        const handleUnauthorized = () => logout();

        window.addEventListener("kanban:unauthorized", handleUnauthorized);

        return () => {
            window.removeEventListener("kanban:unauthorized", handleUnauthorized);
        };
    }, [logout]);

    const value = useMemo(
        () => ({
            user,
            token,
            isAuth: Boolean(user && token),
            login,
            register,
            logout,
        }),
        [user, token, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;