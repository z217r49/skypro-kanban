import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import PageMain from "./pages/PageMain";
import PageBrowse from "./pages/PageBrowse";
import PageNewCard from "./pages/PageNewCard";
import PageExit from "./pages/PageExit";
import PageLogin from "./pages/PageLogin";
import PageRegistration from "./pages/PageRegistration";
import Page404 from "./pages/Page404";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <PageMain />
                    </ProtectedRoute>
                }
            >
                <Route index element={null} />
                <Route path="card/:id" element={<PageBrowse />} />
                <Route path="new-card" element={<PageNewCard />} />
                <Route path="exit" element={<PageExit />} />
            </Route>

            <Route path="/login" element={<PageLogin />} />
            <Route path="/register" element={<PageRegistration />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};

export default AppRoutes;