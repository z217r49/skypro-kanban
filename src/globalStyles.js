import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:before,
    *:after {
        box-sizing: border-box;
    }

    a,
    a:visited {
        text-decoration: none;
        cursor: pointer;
    }

    button,
    ._btn {
        cursor: pointer;
        outline: none;
    }

    ul li {
        list-style: none;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        color: #000000;
    }

    .wrapper {
        max-width: 100%;
        width: 100vw;
        min-height: 100vh;
        overflow: hidden;
        background-color: #eaeef6;
    }

    .container {
        max-width: 1176px;
        width: 100%;
        margin-left: calc(50% - 585px);
        margin-right: calc(50% - 591px);
    }

    ._dark {
        display: none;
    }

    @media screen and (max-width: 495px) {
        .container {
            width: 100%;
            padding: 0 16px;
        }
    }
`;