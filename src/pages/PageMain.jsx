import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Main from "../components/main/Main";

const PageMain = () => {
    return (
        <>
            <Header />
            <Main />
            <Outlet />
        </>
    );
};

export default PageMain;