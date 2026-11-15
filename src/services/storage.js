const AUTH_KEY = "kanban-auth";

export const loadAuth = () => {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const saveAuth = ({ user, token }) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ user, token }));
};

export const clearAuth = () => {
    localStorage.removeItem(AUTH_KEY);
};

export const getToken = () => loadAuth()?.token ?? null;