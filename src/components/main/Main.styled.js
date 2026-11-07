import styled from "styled-components";

// .main
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