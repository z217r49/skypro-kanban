import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { login as loginRequest, register as registerRequest } from "../services/auth";
import { clearAuth, loadAuth, saveAuth } from "../services/storage";

const AuthContext = createContext();

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
    const register = useCallback(
        async ({ login, name, password }) => {
            const nextUser = await registerRequest({ login, name, password });
            applyAuth(nextUser);
            return nextUser;
        },
        [applyAuth]
    );

    // Функция выхода
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
}

// Кастомный хук
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth должен использоваться внутри AuthProvider");
    }

    return context;
}

export default AuthContext;