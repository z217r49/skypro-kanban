import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth должен использоваться внутри AuthProvider");
    }

    return context;
}

export default AuthContext;