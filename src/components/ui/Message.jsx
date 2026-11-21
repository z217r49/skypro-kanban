import { SMessage } from "./Message.styled";

const Message = ({ type = "error", children }) => {
    if (!children) {
        return null;
    }

    return <SMessage className="kanban-message" $type={type}>
                {children}
            </SMessage>
};

export default Message;