import styled, { keyframes } from "styled-components";

export const SMain = styled.main`
    width: 100%;
    background-color: #eaeef6;
`;

export const SMainBlock = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 27px 0 49px;

    @media screen and (max-width: 1200px) {
        padding: 40px 0 64px;
    }

        @media screen and (max-width: 485px) {
        padding-top: 17px;

    }
`;

export const SMainContent = styled.div`
    width: 100%;
    display: flex;
    gap: 19px;
    margin-top: 15px;

    @media screen and (max-width: 1201px) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        justify-content: space-around;
        gap: 10px;
    }

    @media screen and (max-width: 485px) {
        grid-template-rows: repeat(5);
    }
`;

const loaderSpin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

export const SLoader = styled.div`
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #565eef, #9a48f1, #565eef);
    animation: ${loaderSpin} 1s linear infinite;
    position: relative;
    top: 120px;

    &::after {
        content: "";
        position: absolute;
        inset: 6px;
        border-radius: 50%;
        background-color: #eaeef6;
    }

    body[data-theme="dark"] &::after {
        background-color: #151419;
    }
`;

export const SError = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    min-height: 300px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    color: #e52e2e;
    letter-spacing: 0.02em;
    text-align: center;
`;

export const SRetry = styled.button`
    height: 30px;
    padding: 0 20px;
    border: none;
    border-radius: 4px;
    background-color: #565eef;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;

    &:hover {
        background-color: #33399b;
    }
`;