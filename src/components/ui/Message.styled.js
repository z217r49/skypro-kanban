import styled from "styled-components";

const COLORS = {
    error: {
        color: "#e52e2e",        
    },
    success: {
        color: "#06b16e",
        background: "rgba(6, 177, 110, 0.08)",
        border: "rgba(6, 177, 110, 0.25)",
    },
};

export const SMessage = styled.p`
    width: 100%;
    margin-top: 8px;
    font-family: "Arial";
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.14px;
    text-align: center;
    color: ${({ $type }) => (COLORS[$type] ?? COLORS.error).color};
`;