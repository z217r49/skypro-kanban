import { useEffect, useRef, useState } from "react";
import PopUser from "./popups/PopUser";

const Header = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const userMenuRef = useRef(null);

    const toggleUserMenu = (event) => {
        event.preventDefault(); // убираем переход по #user-set-target
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
        <header className="header">
            <div className="container">
                <div className="header__block">
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

                    <nav className="header__nav">
                        <button className="header__btn-main-new _hover01" id="btnMainNew">
                            <a href="#popNewCard">Создать новую задачу</a>
                        </button>

                        <div
                            ref={userMenuRef}
                            style={{ display: "contents" }}
                        >
                            <a
                                href="#user-set-target"
                                className="header__user _hover02"
                                onClick={toggleUserMenu}
                            >
                                Ivan Ivanov
                            </a>

                            {isUserMenuOpen && (
                                <PopUser onClose={() => setIsUserMenuOpen(false)} />
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;