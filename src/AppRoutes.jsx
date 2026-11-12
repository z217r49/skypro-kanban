import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import PageMain from "./pages/PageMain";
import PageBrowse from "./pages/PageBrowse";
import PageNewCard from "./pages/PageNewCard";
import PageExit from "./pages/PageExit";
import PageLogin from "./pages/PageLogin";
import PageRegistration from "./pages/PageRegistration";
import Page404 from "./pages/Page404";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Доска: шапка + колонки, вложенные маршруты рисуются поверх доски */}
            <Route path="/" element={<PageMain />}>
                <Route index element={null} />

                {/* Просмотр карточки: id берётся из адреса */}
                <Route
                    path="card/:id"
                    element={
                        <ProtectedRoute>
                            <PageBrowse />
                        </ProtectedRoute>
                    }
                />

                {/* Добавление задачи */}
                <Route
                    path="new-card"
                    element={
                        <ProtectedRoute>
                            <PageNewCard />
                        </ProtectedRoute>
                    }
                />

                {/* Выход из аккаунта */}
                <Route path="exit" element={<PageExit />} />
            </Route>

            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegistration />} />

            {/* 404 */}
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AppRoutes;