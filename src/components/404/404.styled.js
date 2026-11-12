import styled from "styled-components";

export const S404 = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #eaeef6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
`;

export const S404Container = styled.div`
  width: 100%;
  max-width: 1176px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const S404Block = styled.div`
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
  text-align: center;

  @media screen and (max-width: 495px) {
    padding: 40px 20px;
  }
`;

export const S404Code = styled.p`
  margin-bottom: 10px;
  color: #565eef;
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -4px;

  @media screen and (max-width: 495px) {
    font-size: 64px;
    letter-spacing: -2px;
  }
`;

export const S404Ttl = styled.h2`
  margin-bottom: 14px;
  color: #000000;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.4px;
`;

export const S404Text = styled.p`
  margin-bottom: 30px;
  color: #94a6be;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
`;

export const S404Link = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 20px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #565eef;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.14px;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
  }
`;