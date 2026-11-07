import styled from 'styled-components';

export const SColumn = styled.div`
    width: 20%;
    margin: 0 auto;
    display: block;

    @media screen and (max-width: 1200px) {
        width: 100%;
        margin: 0 auto;
        display: block;
    }
`;

export const SColumnTitles = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
    color: #94A6BE;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
`;

export const SColumnP = styled.p`
    color: #94A6BE;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
`;

export const SCards = styled.div`
    width: 100%;
    display: block;
    position: relative;

    @media screen and (max-width: 1200px) {
        width: 100%;
        display: flex;
        overflow-y: auto;
    }
`;