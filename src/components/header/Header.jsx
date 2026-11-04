import { useEffect, useRef, useState } from "react";
import PopUser from "../popups/PopUser";
import {
    SHeader,
    SHeaderBlock,
    SHeaderNav,
    SHeaderBtnMainNew,
    SHeaderBtnMainNewA,
    SHeaderUser,
} from "./Header.styled";

const Header = () => {
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
                        <a href="" target="_self">
                            <img src="../../public/images/logo.png" alt="logo" />
                        </a>
                    </div>
                    <div className="header__logo _dark">
                        <a href="" target="_self">
                            <img src="../../public/images/logo_dark.png" alt="logo" />
                        </a>
                    </div>

                    <SHeaderNav>
                        <SHeaderBtnMainNew id="btnMainNew">
                            <SHeaderBtnMainNewA href="#popNewCard">Создать новую задачу</SHeaderBtnMainNewA>
                        </SHeaderBtnMainNew>

                        <div
                            ref={userMenuRef}
                            style={{ display: "contents" }}
                        >
                            <SHeaderUser
                                href="#user-set-target"
                                onClick={toggleUserMenu}
                            >
                                Ivan Ivanov
                            </SHeaderUser>

                            {isUserMenuOpen && (
                                <PopUser onClose={() => setIsUserMenuOpen(false)} />
                            )}
                        </div>
                    </SHeaderNav>
                </SHeaderBlock>
            </div>
        </SHeader>
    );
};

export default Header;