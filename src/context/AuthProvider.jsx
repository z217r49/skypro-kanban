import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginRequest, register as registerRequest } from "../services/auth";
import { clearAuth, loadAuth, saveAuth } from "../services/storage";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => loadAuth()?.user ?? null);
    const [token, setToken] = useState(() => loadAuth()?.token ?? null);

    const applyAuth = useCallback((nextUser) => {
        setUser(nextUser);
        setToken(nextUser.token ?? null);
        saveAuth({ user: nextUser, token: nextUser.token ?? null });
    }, []);

    const login = useCallback(
        async ({ login, password }) => {
            const nextUser = await loginRequest({ login, password });
            applyAuth(nextUser);
            return nextUser;
        },
        [applyAuth]
    );

    const register = useCallback(
        async ({ login, name, password }) => {
            const registeredUser = await registerRequest({ login, name, password });

            // API может вернуть пользователя без токена — тогда сразу логинимся,
            // иначе ProtectedRoute не пустит на доску.
            const nextUser = registeredUser?.token
                ? registeredUser
                : await loginRequest({ login, password });

            applyAuth(nextUser);
            return nextUser;
        },
        [applyAuth]
    );

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        clearAuth();
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
};