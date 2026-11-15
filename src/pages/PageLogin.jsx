import { Navigate } from "react-router-dom";
import PopLogin from "../components/login/Login";
import { useAuth } from "../context/AuthContext";

const PageLogin = () => {
    const { isAuth } = useAuth();

    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    return <PopLogin />;
};

export default PageLogin;