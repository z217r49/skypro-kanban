import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
    SHeaderPopUserSet,
    SPopUserSetName,
    SPopUserSetMail,
    SPopUserSetTheme,
    SPopUserSetButton,
} from "./PopUser.styled";

const PopUser = ({ onClose }) => {
    const { user } = useAuth();

    return (
        <SHeaderPopUserSet id="user-set-target">
            <SPopUserSetName>{user?.name ?? "Ivan Ivanov"}</SPopUserSetName>
            <SPopUserSetMail>{user?.email ?? "ivan.ivanov@gmail.com"}</SPopUserSetMail>

            <SPopUserSetTheme>
                <p>Темная тема</p>
                <input type="checkbox" className="checkbox" name="checkbox" />
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