import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
    SPopExit,
    SPopExitContainer,
    SPopExitBlock,
    SPopExitTtl,
    SPopExitFormGroup,
    SPopExitExitYes,
    SPopExitExitNo,
} from "./PopExit.styled";

const PopExit = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleExit = () => {
        logout();
        navigate("/login", { replace: true, state: null });
    };

    return (
        <SPopExit id="popExit">
            <SPopExitContainer>
                <SPopExitBlock>
                    <SPopExitTtl>
                        <h2>Выйти из аккаунта?</h2>
                    </SPopExitTtl>
                    <form id="formExit" action="#">
                        <SPopExitFormGroup>
                            <SPopExitExitYes id="exitYes" type="button" onClick={handleExit}>
                                Да, выйти
                            </SPopExitExitYes>
                            <SPopExitExitNo id="exitNo">
                                <Link to="/">Нет, остаться</Link>
                            </SPopExitExitNo>
                        </SPopExitFormGroup>
                    </form>
                </SPopExitBlock>
            </SPopExitContainer>
        </SPopExit>
    );
};

export default PopExit;