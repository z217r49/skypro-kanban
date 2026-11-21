import styled from "styled-components";

export const SCalendar = styled.div`
    width: 182px;
    margin-bottom: 20px;

    @media screen and (max-width: 660px) {
        width: 344px;
    }

    @media screen and (max-width: 495px) {
        width: 100%;
    }
`;

export const SCalendarTtl = styled.p`
    margin-bottom: 14px;
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
`;

export const SCalendarBlock = styled.div`
    display: block;
`;

export const SCalendarNav = styled.div`
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
`;

export const SCalendarMonth = styled.div`
    color: #94a6be;
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
`;

export const SNavActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SNavAction = styled.div`
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        fill: #94a6be;
        transition: fill 0.15s ease;
    }

    &:hover svg {
        fill: #565eef;
    }
`;

export const SCalendarContent = styled.div`
    margin-bottom: 12px;
`;

export const SCalendarDaysNames = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 7px 0;
    padding: 0 7px;
`;

export const SCalendarDayName = styled.div`
    color: #94a6be;
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.2px;
`;

export const SCalendarCells = styled.div`
    width: 182px;
    min-height: 126px;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 660px) {
        width: 344px;
        height: auto;
        justify-content: space-around;
    }

    @media screen and (max-width: 495px) {
        width: 100%;
    }
`;

export const SCalendarCell = styled.div`
    width: 22px;
    height: 22px;
    margin: 2px;
    border-radius: 50%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    color: #94a6be;
    font-size: 10px;
    line-height: 1;
    letter-spacing: -0.2px;
    cursor: pointer;

    ${({ $otherMonth, $disabled }) =>
        !$otherMonth &&
        !$disabled &&
        `&:hover {
            color: #94a6be;
            background-color: rgba(234, 238, 246, 1);
        }`}

    ${({ $otherMonth }) => $otherMonth && "opacity: 0; pointer-events: none;"}
    ${({ $current }) => $current && 
        `
        font-weight: 700;
        color: #000000;

        body[data-theme="dark"] & {
            color: #ffffff;
        }
    `}
    ${({ $active }) => $active && "background-color: rgba(148, 166, 190, 1); color: #ffffff; font-weight: 700;"}
    ${({ $disabled }) => $disabled && "cursor: default;"}

    @media screen and (max-width: 660px) {
        width: 42px;
        height: 42px;
        font-size: 14px;
    }
`;

export const SCalendarPeriod = styled.div`
    padding: 0 7px;
`;

export const SCalendarP = styled.p`
    color: #94a6be;
    font-size: 10px;
    line-height: 1.4;

    span {
        color: #000000;
        font-weight: 500;
    }

    body[data-theme="dark"] & span {
        color: #ffffff;
    }
`;