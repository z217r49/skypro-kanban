import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import {
    SHeaderPopUserSet,
    SPopUserSetName,
    SPopUserSetMail,
    SPopUserSetTheme,
    SPopUserSetButton,
} from "./PopUser.styled";

const PopUser = ({ onClose }) => {
    const { user } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    return (
        <SHeaderPopUserSet className="kanban-user-menu" id="user-set-target">
            <SPopUserSetName>{user?.name ?? "Пользователь"}</SPopUserSetName>
            <SPopUserSetMail>{user?.login ?? ""}</SPopUserSetMail>

            <SPopUserSetTheme>
                <p>Темная тема</p>
                <input
                    type="checkbox"
                    className="checkbox"
                    name="checkbox"
                    checked={isDark}
                    onChange={toggleTheme}
                />
            </SPopUserSetTheme>

            <SPopUserSetButton type="button">
                <Link to="/exit" onClick={onClose}>
                    Выйти
                </Link>
            </SPopUserSetButton>
        </SHeaderPopUserSet>
    );
};

export default PopUser;