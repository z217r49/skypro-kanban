import styled from "styled-components";

export const SColumn = styled.div`
    flex: 1 1 0;
    display: block;
    border-radius: 10px;

    @media screen and (max-width: 1201px) {
        width: 100%;
        flex: 0 0 auto;
        margin: 0 auto;
        display: block;
    }
`;

export const SColumnTitles = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const SColumnP = styled.p`
    color: #94a6be;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.14px;
`;

export const SCards = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 40px;

    @media screen and (max-width: 485px) {
        flex-direction: row;
        gap: 10px;
    }    
`;

export const SCardPlaceholder = styled.div`
    width: 220px;
    height: 130px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px dashed #94a6be;
    background-color: transparent;
    pointer-events: none;
`;