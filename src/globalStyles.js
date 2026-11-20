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
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    .wrapper {
        max-width: 100%;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
        background-color: #eaeef6;
    }

    .container {
        max-width: 1176px;
        width: 100%;
        margin-left: calc(50% - 585px);
        margin-right: calc(50% - 585px);
    }

    ._dark {
        display: none;
    }

    @media screen and (max-width: 1201px) {
        .container {
            width: 100%;
            padding: 0 16px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    @media screen and (max-width: 482px) {
        margin-left: auto;
        margin-right: auto;        
    }

    /* ---------- тёмная тема ---------- */

    body[data-theme="dark"] {
        background-color: #151419;
        color: #ffffff;
    }

    body[data-theme="dark"] .wrapper,
    body[data-theme="dark"] .kanban-main {
        background-color: #151419;
    }

    body[data-theme="dark"] .kanban-header {
        background-color: #20202c;
    }

    body[data-theme="dark"] .header__logo._light {
        display: none;
    }

    body[data-theme="dark"] .header__logo._dark {
        display: block;
    }

    body[data-theme="dark"] .kanban-card {
        background-color: #20202c;
    }

    body[data-theme="dark"] .kanban-card__title {
        color: #ffffff;
    }

    body[data-theme="dark"] .kanban-modal {
        background-color: #20202c;
        border-color: #4e5566;
    }

    body[data-theme="dark"] .kanban-modal h2,
    body[data-theme="dark"] .kanban-modal h3,
    body[data-theme="dark"] .kanban-modal label {
        color: #ffffff;
    }

    body[data-theme="dark"] .kanban-modal p:not(.kanban-message) {
        color: #c7cddb;
    }

    body[data-theme="dark"] .kanban-modal .kanban-chip,
    body[data-theme="dark"] .kanban-modal .kanban-chip p {
        color: inherit;
    }

    body[data-theme="dark"] .kanban-modal input,
    body[data-theme="dark"] .kanban-modal textarea {
        background-color: transparent;
        color: #ffffff;
        border-color: #4e5566;
    }

    body[data-theme="dark"] .kanban-user-menu {
        background: #20202c;
        border-color: #4e5566;
    }

    body[data-theme="dark"] .kanban-user-menu p {
        color: #ffffff;
    }
`;