import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const THEME_KEY = "kanban-theme";

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) ?? "light");

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const value = useMemo(
        () => ({ theme, isDark: theme === "dark", toggleTheme }),
        [theme, toggleTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;