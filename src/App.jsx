import { GlobalStyle } from "./globalStyles";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthProvider";
import { TaskProvider } from "./context/TaskProvider";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <TaskProvider>
                    <GlobalStyle />
                    <div className="wrapper">
                        <AppRoutes />
                    </div>
                </TaskProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;