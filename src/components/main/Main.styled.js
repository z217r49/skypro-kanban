import styled from "styled-components";

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
`;

export const SMainContent = styled.div`
    width: 100%;
    display: flex;
    gap: 19px;
`;

export const SLoading = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 300px;
    font-size: 18px;
    font-weight: 500;
    color: #94a6be;
    letter-spacing: 0.02em;
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