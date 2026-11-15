import { SMessage } from "./Message.styled";

const Message = ({ type = "error", children }) => {
    if (!children) {
        return null;
    }

    return <SMessage $type={type}>{children}</SMessage>;
};

export default Message;