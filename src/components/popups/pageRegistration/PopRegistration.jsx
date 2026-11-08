import { Link } from "react-router-dom";
import {
    SWrapper,
    SContainerSignup,
    SModal,
    SModalBlock,
    SModalTtl,
    SModalFormLogin,
    SModalInput,
    SModalBtnSignupEnt,
    SModalFormGroup,
} from "./PopRegistration.stayled";

const PopRegistration = ({ dark = false }) => {
    return (
        <SWrapper $dark={dark}>
            <SContainerSignup>
                <SModal>
                    <SModalBlock $dark={dark}>
                        <SModalTtl>
                            <h2>Регистрация</h2>
                        </SModalTtl>
                        <SModalFormLogin id="formLogUp" action="#">
                            <SModalInput
                                $dark={dark}
                                className="first-name"
                                type="text"
                                name="first-name"
                                id="first-name"
                                placeholder="Имя"
                            />
                            <SModalInput
                                $dark={dark}
                                className="login"
                                type="text"
                                name="login"
                                id="loginReg"
                                placeholder="Эл. почта"
                            />
                            <SModalInput
                                $dark={dark}
                                className="password-first"
                                type="password"
                                name="password"
                                id="passwordFirst"
                                placeholder="Пароль"
                            />
                            <SModalBtnSignupEnt id="SignUpEnter">
                                <Link to="/">Зарегистрироваться</Link>
                            </SModalBtnSignupEnt>
                            <SModalFormGroup>
                                <p>
                                    Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
                                </p>
                            </SModalFormGroup>
                        </SModalFormLogin>
                    </SModalBlock>
                </SModal>
            </SContainerSignup>
        </SWrapper>
    );
};

export default PopRegistration;