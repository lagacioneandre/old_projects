import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #fff;
        color: #222;
        -webkit-font-smooth: antialiased;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyles;
