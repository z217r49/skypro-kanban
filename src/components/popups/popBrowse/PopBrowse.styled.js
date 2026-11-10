import styled from "styled-components";

const colorStyles = ({ $color }) => {
    switch ($color) {
        case "orange":
            return "background-color: #ffe4c2; color: #ff6d00;";
        case "green":
            return "background-color: #b4fdd1; color: #06b16e;";
        case "purple":
            return "background-color: #e9d4ff; color: #9a48f1;";
        case "gray":
            return "background: #94a6be; color: #ffffff;";
        default:
            return "";
    }
};

export const SPopBrowse = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;

  @media screen and (max-width: 660px) {
    top: 70px;
  }
`;

export const SPopBrowseContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 660px) {
    padding: 0;
    justify-content: flex-start;
  }
`;

export const SPopBrowseBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;

  @media screen and (max-width: 660px) {
    border-radius: 0;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 16px 32px;
  }
`;

export const SPopBrowseContent = styled.div`
  display: block;
  text-align: left;
`;

export const SPopBrowseTopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const SPopBrowseTtl = styled.h3`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const SThemeTop = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 1;

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
  }

  ${colorStyles}

  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const SThemeDown = styled.div`
  display: none;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    display: block;
    margin-bottom: 20px;
  }
`;

export const SThemeDownTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 1;

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
  }

  ${colorStyles}
`;

export const SPopBrowseStatus = styled.div`
  margin-bottom: 11px;
`;

export const SStatusP = styled.p`
  margin-bottom: 14px;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const SStatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const SStatusTheme = styled.div`
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94a6be;
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;

  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
  }

  ${colorStyles}
  ${({ $hide }) => $hide && "display: none;"}
`;

export const SPopBrowseWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 660px) {
    display: block;
  }
`;

export const SPopBrowseForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    max-width: 100%;
  }
`;

export const SFormBrowseBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SSubttl = styled.label`
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const SFormBrowseArea = styled.textarea`
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #eaeef6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
  }

  &::-moz-placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
  }

  @media screen and (max-width: 495px) {
    max-width: 100%;
    height: 37px;
  }
`;

export const SPopBrowseBtnBrowse = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  button {
    height: 30px;
    margin-bottom: 10px;
    padding: 0 14px;
  }

  @media screen and (max-width: 495px) {
    button {
      width: 100%;
      height: 40px;
    }
  }
`;

export const SPopBrowseBtnEdit = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  button {
    height: 30px;
    margin-bottom: 10px;
    padding: 0 14px;
  }

  ${({ $hide }) => $hide && "display: none;"}

  @media screen and (max-width: 495px) {
    button {
      width: 100%;
      height: 40px;
    }
  }
`;

export const SBtnGroup = styled.div`
  button {
    margin-right: 8px;
  }

  @media screen and (max-width: 495px) {
    width: 100%;

    button {
      margin-right: 0;
    }
  }
`;

export const SBtnBor = styled.button`
  border-radius: 4px;
  border: 0.7px solid var(--palette-navy-60, #565eef);
  outline: none;
  background: transparent;
  color: #565eef;

  a {
    color: #565eef;
  }

  &:hover {
    background-color: #33399b;
    color: #ffffff;
  }

  &:hover a {
    color: #ffffff;
  }
`;

export const SBtnBg = styled.button`
  border-radius: 4px;
  background: #565eef;
  border: none;
  outline: none;
  color: #ffffff;

  a {
    color: #ffffff;
  }

  &:hover {
    background-color: #33399b;
  }
`;