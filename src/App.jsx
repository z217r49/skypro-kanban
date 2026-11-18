import { GlobalStyle } from "./globalStyles";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

function App() {
    return (
        <AuthProvider>
            <TaskProvider>
                <GlobalStyle />
                <div className="wrapper">
                    <AppRoutes />
                </div>
            </TaskProvider>
        </AuthProvider>
    );
}

export default App;