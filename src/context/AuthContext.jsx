import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(
            userData ?? {
                name: "Ivan Ivanov",
                email: "ivan.ivanov@gmail.com",
            }
        );
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({ user, isAuth: Boolean(user), login, logout }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth должен использоваться внутри AuthProvider");
    }

    return context;
};