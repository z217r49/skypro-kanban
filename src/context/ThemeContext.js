import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme должен использоваться внутри ThemeProvider");
    }

    return context;
}

export default ThemeContext;