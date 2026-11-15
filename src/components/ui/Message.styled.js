import styled from "styled-components";

const COLORS = {
    error: {
        color: "#e52e2e",
        background: "rgba(229, 46, 46, 0.08)",
        border: "rgba(229, 46, 46, 0.25)",
    },
    success: {
        color: "#06b16e",
        background: "rgba(6, 177, 110, 0.08)",
        border: "rgba(6, 177, 110, 0.25)",
    },
};

export const SMessage = styled.p`
    width: 100%;
    margin-top: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.14px;
    text-align: center;
    color: ${({ $type }) => (COLORS[$type] ?? COLORS.error).color};
    background-color: ${({ $type }) => (COLORS[$type] ?? COLORS.error).background};
    border: 0.7px solid ${({ $type }) => (COLORS[$type] ?? COLORS.error).border};
`;