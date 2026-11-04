import styled, { keyframes } from "styled-components";

const TOPIC_COLORS = {
    _orange: { background: "#FFE4C2", color: "#FF6D00" },
    _green: { background: "#B4FDD1", color: "#06B16E" },
    _purple: { background: "#E9D4FF", color: "#9A48F1" },
    _gray: { background: "#94A6BE", color: "#FFFFFF" },
};

const cardAnimation = keyframes`
    0% {
        height: 0;
        opacity: 0;
    }
    100% {
        height: auto;
        opacity: 1;
    }
`;

export const SCardItem = styled.div`
    animation-name: ${cardAnimation};
    animation-duration: 500ms;
    animation-timing-function: linear;
    margin-bottom: 10px;
`;

export const SCardsCard = styled.div`
    width: 220px;
    height: 130px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
`;

export const SCardGroup = styled.div`
    width: 100%;
    height: 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SCardTheme = styled.div`
    width: auto;
    height: 20px;
    padding: 5px 14px;
    border-radius: 18px;
    background-color: ${({ $color }) => (TOPIC_COLORS[$color] ?? TOPIC_COLORS._gray).background};
    color: ${({ $color }) => (TOPIC_COLORS[$color] ?? TOPIC_COLORS._gray).color};
`;

export const SCardThemeText = styled.p`
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
    color: inherit;
`;

export const SCardBtn = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2px;
`;

export const SCardBtnDot = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94a6be;
`;

export const SCardContent = styled.div`
    height: 64px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

export const SCardTitle = styled.h3`
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: #000000;
    margin-bottom: 10px;
`;

export const SCardDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
        width: 13px;
    }
`;

export const SCardDateText = styled.p`
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94a6be;
    letter-spacing: 0.2px;
`;