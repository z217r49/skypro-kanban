import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PopUser from "../popups/popUser/PopUser";
import { useAuth } from "../../context/AuthContext";
import {
    SHeader,
    SHeaderBlock,
    SHeaderLogoImg,
    SHeaderNav,
    SHeaderBtnMainNew,
    SHeaderUser,
} from "./Header.styled";

const Header = () => {
    const { user, isAuth } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const userMenuRef = useRef(null);

    const toggleUserMenu = (event) => {
        event.preventDefault();
        setIsUserMenuOpen((isOpen) => !isOpen);
    };

    useEffect(() => {
        if (!isUserMenuOpen) return;

        const handlePointerDown = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isUserMenuOpen]);

    return (
        <SHeader>
            <div className="container">
                <SHeaderBlock>
                    <div className="header__logo _show _light">
                        <Link to="/">
                            <SHeaderLogoImg src="/images/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="header__logo _dark">
                        <Link to="/">
                            <SHeaderLogoImg src="/images/logo_dark.png" alt="logo" />
                        </Link>
                    </div>

                    <SHeaderNav>
                        <SHeaderBtnMainNew as={Link} to="/new-card">
                            Создать новую задачу
                        </SHeaderBtnMainNew>

                        {isAuth ? (
                            <div ref={userMenuRef} style={{ display: "contents" }}>
                                <SHeaderUser onClick={toggleUserMenu}>
                                    {user?.name ?? "Пользователь"}
                                </SHeaderUser>

                                {isUserMenuOpen && (
                                    <PopUser onClose={() => setIsUserMenuOpen(false)} />
                                )}
                            </div>
                        ) : (
                            <SHeaderUser as={Link} to="/login">
                                Войти
                            </SHeaderUser>
                        )}
                    </SHeaderNav>
                </SHeaderBlock>
            </div>
        </SHeader>
    );
};

export default Header;