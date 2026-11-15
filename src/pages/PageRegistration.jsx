import { Navigate } from "react-router-dom";
import PopRegistration from "../components/popups/popRegistration/PopRegistration";
import { useAuth } from "../context/AuthContext";

const PageRegistration = () => {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    return <PopRegistration />;
};

export default PageRegistration;